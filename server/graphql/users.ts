import { gql, IResolvers } from 'apollo-server-express';
import { UserDoc } from '../models/types';
import { UserModel } from '../models';
import bcrypt from 'bcryptjs';

export const UserTypes = gql`
    extend type Query {
        user(userID: String!): User
    }
    extend type Mutation {
        createUser(userInput: UserInput): User
    }

    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }

    input UserInput {
        email: String!
        password: String!
    }
`;

export const UserRes: IResolvers<UserDoc> = {
    Query: {
        user: async (_parent, { userID }) => {
            return UserModel.findById(userID)
                .populate('createdEvents')
                .then(user => user)
                .catch(err => {
                    throw err;
                });
        },
    },
    Mutation: {
        createUser: (_parent, { userInput }) => {
            return UserModel.findOne({ email: userInput.email })
                .then(userFound => {
                    if (userFound) throw new Error('User already exists');
                    else return bcrypt.hash(userInput.password, 12);
                })
                .then(hashedPass => {
                    const user = new UserModel({
                        email: userInput.email,
                        password: hashedPass,
                    });
                    return user
                        .save()
                        .then(newUser => {
                            const { email, _id } = newUser.toObject();
                            return { email, _id };
                        })
                        .catch(err => {
                            throw err;
                        });
                })
                .catch(err => {
                    throw err;
                });
        },
    },
    User: {
        password: () => null,
        createdEvents: async parent => {
            if (parent.createdEvents)
                return parent.createdEvents.map(event => {
                    return {
                        ...event.toObject(),
                        createdBy: parent.toObject(),
                    };
                });
            else return null;
        },
    },
};

import { gql, IResolvers } from 'apollo-server-express';
import { EventModel } from '../models';
import { EventDoc } from '../models/types';
import { UserModel } from '../models';

export const EventTypes = gql`
    extend type Query {
        events: [Event!]!
    }

    extend type Mutation {
        createEvent(eventInput: EventInput): Event
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        createdBy: User!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
    }
`;

export const EventResolvers: IResolvers<EventDoc> = {
    Query: {
        events: async () => {
            return EventModel.find()
                .populate('createdBy')
                .then(events => {
                    return events.map(event => {
                        const { __v, ...rest } = event.toObject();
                        return rest;
                    });
                })
                .catch(err => {
                    throw err;
                });
        },
    },
    Mutation: {
        createEvent: async (_parent, { eventInput }) => {
            const newEvent = new EventModel({
                ...eventInput,
                price: +eventInput.price,
                createdBy: '5d25d5b42fc147134cdcc2c9',
            });
            const user = await UserModel.findById(newEvent.createdBy);
            if (!user) throw new Error('User not found');
            return newEvent
                .save()
                .then(result => {
                    user.createdEvents.push(result);
                    user.save().catch(err => {
                        result.remove().catch(err => {
                            throw err;
                        });
                        throw err;
                    });
                    return result.toObject();
                })
                .catch(err => {
                    throw err;
                });
        },
    },
    Event: {
        date: async parent => {
            return parent.date.toISOString();
        },
        createdBy: async parent => {
            return {
                ...parent.createdBy,
                createdEvents: null,
            };
        },
    },
};

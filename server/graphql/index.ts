import { gql, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import { EventResolvers, EventTypes } from './events';
import { UserTypes, UserRes } from './users';

const RootTypes = gql`
    type Query {
        _empty: String!
    }

    type Mutation {
        _empty: String!
    }
`;

export default makeExecutableSchema({
    typeDefs: [RootTypes, EventTypes, UserTypes],
    resolvers: merge(EventResolvers, UserRes),
});

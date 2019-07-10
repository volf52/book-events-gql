import { makeExecutableSchema, gql } from 'apollo-server-express';
import { EventTypes, EventResolvers } from './events';
import { merge } from 'lodash';

const RootTypes = gql`
    type Query {
        _empty: String!
    }

    type Mutation {
        _empty: String!
    }
`;

export default makeExecutableSchema({
    typeDefs: [RootTypes, EventTypes],
    resolvers: merge(EventResolvers),
});

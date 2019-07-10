import { gql, IResolvers } from 'apollo-server-express';

const events: Array<any> = [];

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
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
    }
`;

export const EventResolvers: IResolvers<string> = {
    Query: {
        events: async () => {
            return events;
        },
    },
    Mutation: {
        createEvent: async (_parent, args) => {
            const newEvent = {
                ...args.eventInput,
                price: +args.eventInput.price,
                _id: Math.random().toString(),
                date: new Date().toISOString(),
            };
            events.push(newEvent);
            return newEvent;
        },
    },
};

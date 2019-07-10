import 'babel-polyfill';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import mongoose from 'mongoose';
import keys from './config/keys';
import routes from './routes';
import { logger } from './utils/logger';
import cookieSession from 'cookie-session';
import { ApolloServer } from 'apollo-server-express';
import gqlSchema from './graphql';

const app = express();

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logging
app.use(expressPinoLogger({ logger }));

app.use(cookieParser());
app.use(
    cookieSession({
        name: 'session',
        keys: [keys.EXPRESS_SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000,
    } as CookieSessionInterfaces.CookieSessionOptions)
);

// GRAPHQL
const apolloServer = new ApolloServer({
    schema: gqlSchema,
    playground: process.env.NODE_ENV === 'development',
    introspection: process.env.NODE_ENV === 'development',
});
apolloServer.applyMiddleware({ app, path: '/graphql' });

// Routes
app.use('/api/users', routes.UserRoute);

// DB Config
const db = keys.mongoURI as string;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

const port = process.env.PORT;
app.listen(port, () => {
    const path = `http://localhost:${port}`;
    console.log(`Server up and running at ${path}!`);
    console.log(`GraphQL running at ${path}${apolloServer.graphqlPath}`);
});

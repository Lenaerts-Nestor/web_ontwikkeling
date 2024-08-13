import mongoDbSession from "connect-mongodb-session";
import session, { MemoryStore } from "express-session";
import { MONGODB_URI } from "./database";   
import { FlashMessage, User } from "../interfaces/interface";

const MongoDBStore = mongoDbSession(session);

const mongoStore = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
    databaseName: "login-express"
});

declare module 'express-session' {
    export interface SessionData {
        user?: User
        message?: FlashMessage;
    }
}

export default session({
    secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
    store: mongoStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
});


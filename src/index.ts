import dotenv from "dotenv";
import Config from './config/config';
import activity from './config/logging';
import Server from './server';
import mongoose from 'mongoose';

dotenv.config();

const CONFIG: Config = new Config();

activity.info("\nConnecting to db...\n");

mongoose
    .connect(
        CONFIG.MONGO_DB.CONNECTION_STRING,
        CONFIG.MONGO_DB.OPTIONS
    )
    .then(() => {
        activity.info('Connected to db.\n\nStarting app...');
        startApp();
    })
    .catch(error => {
        activity.info('\nError connecting to db...\n\n' + error);
        activity.info('\nApp not started.\n\n');
    });

function startApp() {
    try {
        const server: Server = Server.init(+CONFIG.SERVER.PORT);
        server.start(() => {
            activity.info(`App started.\nApp listening at ${CONFIG.SERVER.URL}`);
        });
    } catch (error) {
        activity.error('Error starting app...\n' + error);
    }
}
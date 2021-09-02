import App from './app';
import http from 'http';
import mongoose from 'mongoose';
import bluebird from 'bluebird'
import MainController from "./controllers/MainController";
import SSRController from "./controllers/SSRController";
import AdminController from "./controllers/AdminController"

require('dotenv').config();

console.log(process.env.FOO);

const app = new App(
    [
        new SSRController(),
        new MainController(),
        new AdminController()
    ],
    3000,
);

const createSever: http.Server = http.createServer(app.app);

const start = () => {
    createSever.listen(app.port, () => {
        console.log(`listening on *:${app.port}`);
    });
}

const connectDb = () => {
    mongoose.Promise = bluebird

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }
    mongoose.connect('mongodb://localhost/orinice', options)
    return mongoose.connection
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', start)

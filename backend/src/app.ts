import * as express from 'express';
import { appConfig } from './config'
import * as cors from 'cors';
import { json, urlencoded } from 'body-parser';
import * as logger from "./commons/logger";
import * as error from "./commons/errorHandler"
import * as routes from "./routes"
import mongoose from "./commons/mongoose";
import * as path from 'path';

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use(cors());

app.use(express.static('client'))

//define api server routes here
app.use(routes)

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use("*", error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.resolve('src','uploads')));

console.log(path.join(__dirname, 'uploads', 'file-1687003075560.pdf'))
console.log(path.resolve('src','uploads'))

const startWithPort = async (port: Number) => {
    try {
        logger.info("Starting Api server .......");
        //connect to mongodb
        await mongoose.connect()
        app.listen(port, () => logger.info(`Api Server listening on port : ${port}`));
    } catch (e) {
        console.log(e);
        logger.error("Error starting api server", e.message || e);
        process.exit(1);
    }

}

const start = async () => {
    let port = Number(appConfig.apiPort)
    await startWithPort(port);
}

export {
    app,
    start,
    startWithPort
}

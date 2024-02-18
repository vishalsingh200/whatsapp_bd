import mongoose from "mongoose";
import app from "./app.js"
import logger from "./configs/logger.config.js";

//environment varable
const {DATABASE_URL} = process.env;
const PORT = process.env.PORT || 8000;

//exit on mongo error
mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error : ${err}`);
    process.exit(1);
})

//mongodb debug mode
if(process.env.NODE_ENV !== "production"){
    mongoose.set('debug', true);
}


//mongodb connection
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    logger.info('Connected to Mongodb')
})


let server;

server = app.listen(PORT, () => {
    logger.info(`server running at port ${PORT}...`);
})


//handle server errors

const exitHandler = () => {
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }
    else{
        process.exit(0);
    }
}

const unexpectedErrorsHandler = (error) =>{
    logger.error(error);
    exitHandler();
};
process.on('uncaughtException', unexpectedErrorsHandler);
process.on('unhandledRejection', unexpectedErrorsHandler);


//sigterm signal
process.on("SIGTERM", () => {
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }
})
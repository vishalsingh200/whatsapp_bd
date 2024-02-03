import app from "./app.js"
import logger from "./configs/logger.config.js";

//environment varable
const PORT = process.env.PORT || 8000;

let server;

server = app.listen(PORT, () => {
    logger.info(`server running at port ${PORT}...`);
    // console.log("process id", process.pid)
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
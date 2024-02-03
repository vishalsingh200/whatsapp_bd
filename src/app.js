import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize"
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import route from "./routes/index.js"

//dot env confog
dotenv.config();

//create react app

const app = express();


//Morgan
if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}


//helmet
app.use(helmet());


//parse json request url
app.use(express.json());


//parse json request body
app.use(express.urlencoded({extended: true}));


//sanitize request data
app.use(mongoSanitize());


//Enable cooke parser
app.use(cookieParser());


//gzip compression
app.use(compression());


//file upload
app.use(fileUpload({
    useTempFiles : true,  //Use temp files for
}))


//cors
app.use(cors())


//api v1 routes
app.use("/api/v1", route);


app.post('/test', (req, res) => {
    throw createHttpError.BadRequest("this route has an error.")
});


app.use(async(req, res, next) => {
    next(createHttpError.NotFound("This route does not exits."))
})


//error handling
app.use(async(err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})


export default app;
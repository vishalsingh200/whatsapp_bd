import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize"
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

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

app.post('/test', (req, res) => {
    res.send("hello from server");
});

export default app;
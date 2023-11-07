import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from './routes/index.js'

// dotenv config
dotenv.config();

// create express app
const app = express();

// use morgan to log requests to the console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middlewares

// use helmet to secure express app
app.use(helmet());

// parse requests of content-type - application/json
app.use(express.json());

// saniteze request data
app.use(mongoSanitize());

// enable cookie parser
app.use(cookieParser());

// gzip compression
app.use(compression());

// file upload middleware
app.use(
  fileUpload({
    useTempFiles: true, // default false
  })
);

// course middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// routes  
app.use('/api/v1', routes)


app.use(async (req, res, next) => {
    next(createHttpError.NotFound('this rotue does not exist'))
});

// error handler
app.use(async (err, req, res, next) => {
res.status(err.status || 500);
res.send({
    error:{
        status: err.status || 500,
        message: err.message,
    }
})
}); 

export default app;

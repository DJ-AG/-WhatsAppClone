import app from "./app.js";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";
import * as config from "./utils/config.js";


let server;


//exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

if(process.env.NODE_ENV === "production") {
  mongoose.set("debug", true);
}


// connect to mongoDB
mongoose.connect(config.mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info("Connected to MongoDB");
}
).catch((error) => {
  logger.error("Error connecting to MongoDB");
}
);


server = app.listen(config.port, () => {
  logger.info(`Server in ${process.env.NODE_ENV} `);
  logger.info(`Server is running on port: ${config.port}`);
});




// hadle server errors
const exitHandler = () => {
  if(server) {
    logger.info("Closing http server");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// Signal handlers sigterm

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if(server) {
    logger.info("server closed");
    process.exit(1);
  }
});

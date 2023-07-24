import express from 'express';
import { json } from 'body-parser';
import { createLogger, format as _format, transports as _transports } from 'winston';
const app = express();
const port = process.env.PORT || 3000;

import userRoute from './route/userRoute';
const MONGODB_URI = process.env.MONGODB_URI;

const logger = createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  defaultMeta: { service: 'auth-service' },
  transports: [
    new _transports.File({ filename: './error/error.log', level: 'error' }),
    new _transports.File({ filename: './error/combined.log' }),
  ],
});

// Log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Log errors
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  next(err);
});
app.use(json());

app.use('/users', userRoute);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`User Authentication Microservice running on port ${port}`);
      
    });
    
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if there is an error connecting to MongoDB
  });



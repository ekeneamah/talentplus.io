import express from 'express';
import { json } from 'body-parser';
const app = express();
const port = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
import route from './route/orderRoute';

app.use(json());

app.use('/products', route);


mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Order processing Microservice running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if there is an error connecting to MongoDB
  });


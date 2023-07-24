const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

const route = require('./route/cartRoute');
const MONGODB_URI = process.env.MONGODB_URI;
app.use(bodyParser.json());

app.use('/products', route);




mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Cart processing Microservice running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if there is an error connecting to MongoDB
  });



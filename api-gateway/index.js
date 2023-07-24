import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import apiGateway from './api-gateway';
import microservices from './microservices';

const app = express();
const port = 8000;

// Set up the API Gateway
apiGateway(app);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

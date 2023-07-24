import express from 'express';
import { validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import basicAuth from 'express-basic-auth';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function configureApiGateway(app) {
  // Request Validation Middleware
  app.use((req, res, next) => {
    // Define validation rules for each route using express-validator
    // For example, validating the 'name' parameter for a POST request
    req.check('name', 'Name is required').notEmpty();
  
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });

  // Rate Limiting Middleware (Limiting to 100 requests per hour)
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // Max number of requests per windowMs
  });
  app.use(limiter);

  // Define valid API keys (You should store them securely)
  const apiKeys = {
    'user-authentication': 'api-key-for-user-authentication',
    'product-catalog': 'api-key-for-product-catalog',
    // Add more API keys for other microservices
  };

  // Authentication Middleware
  app.use(basicAuth({
    authorizer: (username, password) => {
      // Check if the provided API key matches the one in the 'apiKeys' object
      return apiKeys[username] === password;
    },
    challenge: true, // Sends a 401 Unauthorized response for failed authentication
  }));

  // Define routes and their corresponding microservices
  const routes = [
    {
        path: '/user-authentication/*',
        target: 'user-authentication', 
      },
      {
        path: '/product-catalog/*',
        target: 'product-catalog', 
      },
      {
        path: '/shopping-cart/*',
        target: 'shopping-cart', 
      },
      {
        path: '/order-processing/*',
        target: 'order-processing', 
      },
      {
        path: '/payment-gateway/*',
        target: 'payment-gateway', 
      },
  ];

  // Create a proxy for each route with load balancing (round-robin strategy)
  let currentMicroserviceIndex = 0;
  routes.forEach((route) => {
    app.use(route.path, createProxyMiddleware({ target: route.target, changeOrigin: true }));
    currentMicroserviceIndex = (currentMicroserviceIndex + 1) % routes.length;
  });

  // Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
};

// api/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import enquiryRouter from './routes/Enquiry.route.js';
import blogRouter from './routes/blog.route.js';

dotenv.config();

// --- DATABASE CONNECTION (Serverless Safe) ---
let connectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (!process.env.MONGO) {
    throw new Error('MONGO environment variable is not defined!');
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO, {
      serverSelectionTimeoutMS: 5000,
    }).then(() => {
      console.log('Connected to MongoDB successfully!');
    }).catch((err) => {
      connectionPromise = null;
      throw err;
    });
  }

  await connectionPromise;
}

const app = express();

// --- BODY & COOKIE PARSERS ---
app.use(express.json());
app.use(cookieParser());

// --- CORS & CREDENTIALS MIDDLEWARE ---
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// --- PRE-FLIGHT DATABASE CONNECTION MIDDLEWARE ---
app.use(async (req, res, next) => {
  if (req.path === '/' || req.path === '/api' || req.path === '/api/health') {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error.message);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Database connection failed: ' + error.message,
    });
  }
});

// --- HEALTH & STATUS CHECK ---
const healthHandler = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Real Estate API is running',
    timestamp: new Date().toISOString(),
  });
};

app.get('/', healthHandler);
app.get('/api', healthHandler);
app.get('/api/health', healthHandler);

// --- API ROUTES REGISTRATION ---
const registerRoutes = (prefix = '') => {
  app.use(`${prefix}/user`, userRouter);
  app.use(`${prefix}/auth`, authRouter);
  app.use(`${prefix}/listing`, listingRouter);
  app.use(`${prefix}/enquiry`, enquiryRouter);
  app.use(`${prefix}/blog`, blogRouter);
};

registerRoutes('/api');
registerRoutes('');

// --- 404 CATCH-ALL FOR API ROUTES ---
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'Field';
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists!`;
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
}

export default app;
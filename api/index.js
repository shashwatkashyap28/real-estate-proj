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

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO);
  isConnected = true;
  console.log('Connected to MongoDB!');
}
connectDB().catch((err) => console.error('MongoDB connection error:', err));

const app = express();

app.use(express.json());
app.use(cookieParser());

// --- API ROUTES ---
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/enquiry', enquiryRouter);
app.use('/api/blog', blogRouter);

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({ success: false, statusCode, message });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log('Server is running on port 3000!'));
}

export default app;
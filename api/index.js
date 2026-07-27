import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import enquiryRouter from './routes/Enquiry.route.js';
import blogRouter from './routes/blog.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

// --- API ROUTES (Must be placed BEFORE static files and wildcard route) ---
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/enquiry', enquiryRouter); // 👈 Correctly mounts /api/enquiry/create, /api/enquiry/all, etc.
app.use('/api/blog', blogRouter); // 👈 Mounts /api/blog/create, /api/blog/get, etc.

// --- STATIC FILES & CLIENT ROUTING ---
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
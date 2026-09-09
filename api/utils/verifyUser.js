import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token =
    req.cookies?.access_token ||
    req.headers.authorization?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return next(errorHandler(401, 'Unauthorized: Access token missing'));
  }

  if (!process.env.JWT_SECRET) {
    return next(errorHandler(500, 'Server error: JWT_SECRET is not configured'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, 'Forbidden: Invalid or expired token'));
    }

    req.user = user;
    next();
  });
};
import { errorHandler } from './error.js';
import User from '../models/user.model.js';

// Run this AFTER verifyToken in your route chain — it relies on
// req.user.id already being set by the JWT check.
export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return next(errorHandler(403, 'Admin access only'));
    }
    next();
  } catch (error) {
    next(error);
  }
};
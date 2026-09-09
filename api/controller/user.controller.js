import argon2 from 'argon2';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, 'You can only update your own account!'));
  }

  try {
    const updateFields = {};

    if (req.body.username && req.body.username.trim()) {
      updateFields.username = req.body.username.trim();
    }

    if (req.body.email && req.body.email.trim()) {
      updateFields.email = req.body.email.trim().toLowerCase();
    }

    if (req.body.password && req.body.password.trim()) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters long!'));
      }
      updateFields.password = await argon2.hash(req.body.password);
    }

    const avatarUrl = req.body.avatar || req.body.photo;
    if (avatarUrl) {
      updateFields.avatar = avatarUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found!'));
    }

    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const requester = await User.findById(req.user.id);
      if (!requester || !requester.isAdmin) {
        return next(errorHandler(403, 'You can only delete your own account!'));
      }
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return next(errorHandler(404, 'User not found!'));
    }

    if (req.user.id === req.params.id) {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User has been deleted successfully!',
    });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, 'You can only view your own listings!'));
  }

  try {
    const listings = await Listing.find({ userRef: req.params.id });
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, 'User not found!'));

    const { password: pass, ...rest } = user._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
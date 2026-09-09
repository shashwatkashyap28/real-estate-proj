import User from '../models/user.model.js';
import argon2 from 'argon2';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, 'Username, email, and password are required!'));
  }

  if (password.length < 6) {
    return next(errorHandler(400, 'Password must be at least 6 characters long!'));
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return next(errorHandler(400, 'Email is already in use!'));
      }
      return next(errorHandler(400, 'Username is already taken!'));
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, 'Email and password are required!'));
  }

  try {
    const validUser = await User.findOne({ email: email.toLowerCase() });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = await argon2.verify(validUser.password, password);
    if (!validPassword) return next(errorHandler(401, 'Invalid email or password!'));

    if (!process.env.JWT_SECRET) {
      return next(errorHandler(500, 'JWT_SECRET is not configured on the server!'));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin || false },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: pass, ...rest } = validUser._doc;

    return res
      .cookie('access_token', token, COOKIE_OPTIONS)
      .status(200)
      .json({
        ...rest,
        token,
      });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;

  if (!email) {
    return next(errorHandler(400, 'Email is required for Google authentication!'));
  }

  if (!process.env.JWT_SECRET) {
    return next(errorHandler(500, 'JWT_SECRET is not configured on the server!'));
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin || false },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password: pass, ...rest } = user._doc;
      return res
        .cookie('access_token', token, COOKIE_OPTIONS)
        .status(200)
        .json({
          ...rest,
          token,
        });
    } else {
      const baseName = name
        ? name.split(' ').join('').toLowerCase()
        : 'user';
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await argon2.hash(generatedPassword);

      const newUser = new User({
        username: `${baseName}${Math.random().toString(36).slice(-4)}`,
        email: email.toLowerCase(),
        password: hashedPassword,
        avatar:
          photo ||
          'https://imgs.search.brave.com/pekBFfEBfmZ5mpETqCk6h5lVaECe_fHVPT_Je3dixgI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2J1c2luZXNz/LW1hbi1hdmF0YXIt/cHJvZmlsZV8xMTMz/MjU3LTI0MzEuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw',
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin || false },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password: pass, ...rest } = newUser._doc;
      return res
        .cookie('access_token', token, COOKIE_OPTIONS)
        .status(200)
        .json({
          ...rest,
          token,
        });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token', COOKIE_OPTIONS);
    return res.status(200).json({
      success: true,
      message: 'User has been logged out successfully!',
    });
  } catch (error) {
    next(error);
  }
};
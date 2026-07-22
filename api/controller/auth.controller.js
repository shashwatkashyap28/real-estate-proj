import User from '../models/user.model.js';
import argon2 from 'argon2';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, email, password: hashedPassword });
    
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    
    const validPassword = await argon2.verify(validUser.password, password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    
    // FIX: Pass isAdmin into the JWT token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // FIX: Pass isAdmin into the JWT token
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );

      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const baseName = req.body.name ? req.body.name.split(' ').join('').toLowerCase() : 'user';
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
        
      const hashedPassword = await argon2.hash(generatedPassword);
      
      const newUser = new User({
        username: baseName + Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo || "https://imgs.search.brave.com/pekBFfEBfmZ5mpETqCk6h5lVaECe_fHVPT_Je3dixgI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2J1c2luZXNz/LW1hbi1hdmF0YXIt/cHJvZmlsZV8xMTMz/MjU3LTI0MzEuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw",
      });
      
      await newUser.save();

      // FIX: Pass isAdmin into the JWT token
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );

      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
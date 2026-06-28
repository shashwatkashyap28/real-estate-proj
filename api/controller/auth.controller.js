import User from "../../models/user.model.js";
import argon2 from "argon2";

export const signup = async(req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await argon2.hash(password);
    const newUser = new User({ username, email, password: hash });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message }); 
    
  }
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json({ message: "User created successfully" });

};
import User from "../../models/user.model.js";
import argon2 from "argon2";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hash = await argon2.hash(password);

        const newUser = new User({
            username,
            email,
            password: hash,
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
        });

    } catch (err) {
        next(errorHandler(500, "Error creating user"));
    }
};
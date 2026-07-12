import User from "../../models/user.model.js";
import argon2 from "argon2";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password , phone } = req.body;

    try {
        const hash = await argon2.hash(password);

        const newUser = new User({
            username,
            email,
            phone,
            password: hash,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
};

export  const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email});
        if  (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = await argon2.verify(validUser.password, password);    
        if (!validPassword) return next(errorHandler(400, "Invalid password"));   
        const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET);
        const { password: pass,...rest} = validUser._doc;
        res.cookie("access_token", token, { httpOnly: true})
        .status(200)
        .json(rest);
    } 
    catch (error) { 
        next(error);
    }
};

        
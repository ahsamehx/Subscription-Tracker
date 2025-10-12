import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js"

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password, role } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            const error = new Error('User already exists');
            error.status = 409;
            throw error;
        }
        if (!name || !email || !password) {
            const error = new Error("All fields (name, email, password) are required");
            error.status = 400;
            throw error;
        }

        // Create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword, 
            role 
        });

        await newUser.save({ session });
        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, role : newUser.role}, JWT_SECRET , {expiresIn : JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ 
            success : true, 
            message: 'User created successfully', 
            data : {
                token,
                name: newUser.name,
                email: newUser.email, 
                role : newUser.role,
                id: newUser._id
            }
        });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res) => {
    try {
        const{ email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if(!user) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            throw error;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            const error = new Error("Invalid email or password");
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET , {expiresIn : JWT_EXPIRES_IN});

        res.status(200).json({ 
            success : true, 
            message: 'User signed in successfully', 
            data : {
                token,
                name: user.name,
                email: user.email, 
                role : user.role,
                id: user._id
            }
        });
    }
    catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message || "Server Error" });
    }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production (HTTPS)
      sameSite: "Strict",
    });

    return res.status(200).json({ success: true, message: "Signed out successfully." });
  } catch (error) {
    next(error);
  }
};


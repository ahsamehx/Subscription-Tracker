import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../config/env.js';
const authorize = async (req, res, next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token) {
            const error = new Error("Not authorized, no token");
            error.status = 401;
            throw error;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user) {
            const error = new Error("Not authorized, user not found");
            error.status = 401;
            throw error;
        }
        req.user = user;
        next();
    }
    catch(error) {
        error.status = 401;
        next(error);
    }
};

export default authorize;
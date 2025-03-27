import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/usersModels.js';
import { STATUS } from '../constants.js';

export const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    const authHeader = req.headers?.authorization || req.headers?.Authorization;

    // 🛑 No token? Immediate vibe check fail
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(STATUS.UNAUTHORIZED).json({
            status: 'fail',
            code: STATUS.UNAUTHORIZED,
            emoji: "🤨",
            message: "Authorization header MIA! Format: 'Bearer YOUR_TOKEN'",
            fixIt: "https://media.giphy.com/media/l0HU7JIWcmf8cZ8k0/giphy.gif"
        });
    }

    try {
        // ✂️ Snip snip - get the actual token
        token = authHeader.split(' ')[1];

        // 🔍 Verify that JWT like a secret agent
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 👤 Fetch user (but leave password out of it!)
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(STATUS.UNAUTHORIZED).json({
                status: 'fail',
                code: STATUS.UNAUTHORIZED,
                emoji: "👻",
                message: "User ghosted us! Token valid but account gone..."
            });
        }

        // 🎉 Attach user to request - you're in!
        req.user = user;
        next();

    } catch (err) {
        // Token failed the vibe check
        return res.status(STATUS.UNAUTHORIZED).json({
            status: 'fail',
            code: STATUS.UNAUTHORIZED,
            emoji: "🤥",
            message: "Token is sus!",
            possibleReasons: [
                "Expired (like milk)",
                "Invalid (like your ex)",
                "You messed with it (🤨)"
            ]
        });
    }
});
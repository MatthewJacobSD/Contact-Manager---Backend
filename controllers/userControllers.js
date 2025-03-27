import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/usersModels.js';
import { STATUS } from '../constants.js';

// 🎭 Register - because everyone loves a debut
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // 🛑 Missing fields? Jail.
    if (!username || !email || !password) {
        return res.status(STATUS.BAD_REQUEST).json({
            status: 'fail',
            emoji: "🤷‍♀️",
            message: "BFFR! Username, email AND password required!",
            missingFields: {
                username: !username ? "MIA" : "✅",
                email: !email ? "MIA" : "✅",
                password: !password ? "MIA" : "✅"
            }
        });
    }

    // 🔍 Existing user check - no clones allowed
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        return res.status(STATUS.CONFLICT).json({
            status: 'fail',
            emoji: "🙅‍♀️",
            message: existingUser.email === email
                ? "Email already in use! Try logging in?"
                : "Username taken! How about '${username}2'?",
            suggestion: existingUser.email === email
                ? null
                : `Try: ${username}${Math.floor(Math.random() * 100)}`
        });
    }

    // ✨ Create user - the main event
    const user = await User.create({ username, email, password });

    // 🔑 Token generation - VIP access only
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(STATUS.CREATED).json({
        status: 'success',
        emoji: "🎊",
        message: "Slay! Account created!",
        data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
            tokenExpires: new Date(Date.now() + 3600000).toISOString()
        }
    });
});

// 🔓 Login - the comeback story
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 🛑 Forgot something?
    if (!email || !password) {
        return res.status(STATUS.BAD_REQUEST).json({
            status: 'fail',
            emoji: "🤦‍♀️",
            message: "Bruh... email AND password required!",
            missing: {
                email: !email ? "🤔 Where?" : "✅",
                password: !password ? "🤔 Where?" : "✅"
            }
        });
    }

    // 🔍 User hunt - with password this time
    const user = await User.findOne({ email }).select('+password');

    // 🔐 Credential check - no imposters allowed
    if (!user || !(await user.comparePassword(password))) {
        return res.status(STATUS.UNAUTHORIZED).json({
            status: 'fail',
            emoji: "👮‍♀️",
            message: "Invalid credentials!",
            hint: "Check your email/password or reset password"
        });
    }

    // 🎟️ Token generation - your golden ticket
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(STATUS.OK).json({
        status: 'success',
        emoji: "🪄",
        message: "Abracadabra! You're in!",
        data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
            tokenExpires: new Date(Date.now() + 3600000).toISOString()
        }
    });
});

// 👑 Current User - the spotlight moment
export const currentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');

    res.status(STATUS.OK).json({
        status: 'success',
        emoji: "🌟",
        message: "Here's your profile, superstar!",
        data: user
    });
});
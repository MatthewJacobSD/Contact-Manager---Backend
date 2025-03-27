import express from 'express';
import {
    currentUser,
    loginUser,
    registerUser,
} from "../controllers/userControllers.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

// 🔓 Public routes (no auth? no problem!)
router.post('/register', registerUser); // "Join the party 🎊"
router.post('/login', loginUser);      // "Gimme them creds 🔑"

// 🔒 Protected route (token or GTFO)
router.get('/current', validateToken, currentUser); // "It’s me, hi 👋"

export default router;
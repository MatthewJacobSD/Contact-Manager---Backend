import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import contacts from './routes/contacts.js';
import users from './routes/users.js';
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/database.js";
import * as path from "node:path";
import mongoose from "mongoose";

// 🔧 Environment setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// 🔒 Env var validation
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URL', 'PORT'];
requiredEnvVars.forEach(env => {
    if (!process.env[env]) {
        console.error(`❌ Missing required environment variable: ${env}`);
        process.exit(1);
    }
});

// 🚀 Express setup
const app = express();
const port = parseInt(process.env.PORT) || 5000;

// 📦 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🏠 Home route
app.get('/', (req, res) => {
    res.status(200).json({
        message: '✨ Contact Manager API is running! ✨',
        endpoints: {
            users: '/api/users',
            contacts: '/api/contacts'
        }
    });
});

// 🛣️ Route handlers
app.use('/api/contacts', contacts);
app.use('/api/users', users);

// 💥 Error handling (last middleware!)
app.use(errorHandler);

// 🏁 Start server with proper Promise handling
const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(port, () => {
            console.log(`\n🌈 Server running on http://localhost:${port}`);
            console.log(`🔌 Available endpoints:`);
            console.log(`👉 Users: http://localhost:${port}/api/users`);
            console.log(`👉 Contacts: http://localhost:${port}/api/contacts\n`);
        });

        // 🛑 Graceful shutdown handlers
        const shutdown = async (signal) => {
            console.log(`\n🛑 ${signal} received - shutting down gracefully...`);

            try {
                // Close the server first to stop new connections
                await new Promise((resolve) => server.close(resolve));
                console.log('✅ Express server closed');

                // Then close database connection
                await mongoose.connection.close(false);
                console.log('✅ MongoDB connection closed');

                console.log('✨ Shutdown complete. Peace out! ✌️');
                process.exit(0);
            } catch (err) {
                console.error('❌ Error during shutdown:', err);
                process.exit(1);
            }
        };

        // Handle different shutdown signals
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));

    } catch (err) {
        console.error('💀 Server startup failed:', err.message);
        process.exit(1);
    }
};

// Start the server
startServer().catch(err => {
    console.error('🔥 Fatal startup error:', err);
    process.exit(1);
});
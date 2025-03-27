import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { STATUS } from '../constants.js';

dotenv.config();

// 🎭 Connection options - because defaults are basic
const connectionOptions = {
    serverSelectionTimeoutMS: 10000, // 10s to pick a server
    socketTimeoutMS: 45000, // 45s to throw hands if stuck
    maxPoolSize: 10, // Squad limit
    retryWrites: true, // "Did you mean...?"
    retryReads: true  // "Say that again?"
};

const connectDB = async () => {
    try {
        console.log("🔌 Attempting to connect to MongoDB...");
        console.log("⏳ Patience is a virtue...");

        const conn = await mongoose.connect(process.env.MONGODB_URL, connectionOptions);

        // 🎉 Success baby!
        console.log(`\n🍃 MongoDB Connected! Here's the tea:`);
        console.log(`   Host: ${conn.connection.host}`);
        console.log(`   Port: ${conn.connection.port}`);
        console.log(`   DB: ${conn.connection.name}`);

        // 💽 Show all databases like a flex
        try {
            const dbList = await conn.connection.db.admin().listDatabases();
            console.log('💾 Available Databases:');
            dbList.databases.forEach(db =>
                console.log(`   - ${db.name} (Size: ${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`));
        } catch {
            console.log("🔒 No db listing permissions - still connected tho!");
        }

        return conn;
    } catch (err) {
        console.error('\n💥 CRITICAL FAILURE:');
        console.error(`   Error: ${err.message}`);
        console.error(`   Code: ${err.code || 'N/A'}`);
        console.error("\nPossible Fixes:");
        console.error("- Check your MONGODB_URL in .env");
        console.error("- Is MongoDB running? 'sudo systemctl start mongod'");
        console.error("- Firewall issues? 'sudo ufw allow 27017'");

        process.exit(STATUS.SERVER_ERROR); // Using our fancy constants
    }
};

// 🎧 Event listeners - because we're nosy
mongoose.connection.on('connected', () => {
    console.log('\n🟢 MongoDB Connection Active - Looking fresh!');
    console.log('   Ready to slay those queries! 💅');
});

mongoose.connection.on('error', (err) => {
    console.error('\n🔴 MongoDB Error - We have a situation!');
    console.error(`   Code: ${err.code || 'Unknown'}`);
    console.error(`   Message: ${err.message}`);
    console.error('   Possible fix: Restart your MongoDB service');
});

mongoose.connection.on('disconnected', () => {
    console.log('\n🟡 MongoDB Disconnected - Well this is awkward...');
    console.log('   Attempting to reconnect...');
});

// 💅 Graceful shutdown handler
const gracefulShutdown = async () => {
    try {
        await mongoose.connection.close(false);
        console.log('\n👋 MongoDB Connection Closed Gracefully');
        console.log('   Bye Felicia! 👋');
        process.exit(0);
    } catch (err) {
        console.error('\n❌ Failed to close MongoDB Connection:');
        console.error(err);
        process.exit(1);
    }
};

// 👂 Listen for shutdown signals
process.on('SIGTERM', gracefulShutdown); // For Kubernetes/Heroku
process.on('SIGINT', gracefulShutdown);  // For Ctrl+C in terminal

export default connectDB;
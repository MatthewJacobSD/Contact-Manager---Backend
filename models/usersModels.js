import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username? Required. Don’t be shy! 😏"],
        minlength: [3, "3+ chars or bust 💥"],
        maxlength: [30, "Whoa there, Shakespeare 📜"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email pls? How else we gonna spam— I mean, contact you? 📧"],
        unique: true,
        lowercase: true,
        match: [
            /^\w+(-?\w+)*@\w+(-?\w+)*(\.\w{2,3})+$/,
            "That email sus 🕵️‍♂️"
        ]
    },
    password: {
        type: String,
        required: [true, "Password required (no 'password123' pls) 🙄"],
        minlength: [8, "8+ chars or hackers go brrr 💻"],
        select: false // ✨ Secret sauce
    }
}, {
    timestamps: true,
    versionKey: false
});

// 🔥 Password hashing middleware
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12); // Salty like our DMs 🧂
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err); // "Oops? 🤷‍♂️"
    }
});

// 🔍 Password checker
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // "Same same? ✅"
};

export default mongoose.model('User', UserSchema);
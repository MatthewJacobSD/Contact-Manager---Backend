import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Name? Required. Even Cher had one 🎤"],
            minlength: [3, "Name too smol 🧸"],
        },
        lastname: {
            type: String,
            required: [true, "Lastname? Required. This ain’t T-Swift 🎸"],
            minlength: [3, "Lastname too smol 🐜"],
        },
        email: {
            type: String,
            required: [true, "Email? How else they gonna slide in? 💌"],
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
                },
                message: "Email fake news 🗞️",
            },
        },
        phoneNo: {
            type: String,
            required: [true, "Phone? Required. No fax numbers pls 📞"],
        },
    },
    {
        timestamps: true, // ⏳ Auto "createdAt" and "updatedAt"
    }
);

export default mongoose.model("Contact", ContactSchema);
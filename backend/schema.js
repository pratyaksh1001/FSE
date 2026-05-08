import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true,
    },
);

const searchQuery = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

userSchema.index({ email: 1 });
searchQuery.index({ user: 1 });

export const User = mongoose.model("User", userSchema);
export const SearchQuery = mongoose.model("SearchQuery", searchQuery);

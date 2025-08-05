import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address',
        ],
    },
    password: {
        type: String,
        required: [ true , 'Password is required.'],
        minlength: 5
    },
}, {
    timestamps: true,
})

export const User = mongoose.model("User", userSchema);
import mongoose, {Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
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
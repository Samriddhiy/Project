import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    }, 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
} , {
    timestamps: true,
})

export const Task = mongoose.model('Task', taskSchema);
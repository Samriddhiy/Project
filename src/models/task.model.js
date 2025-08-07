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
        type: String,
    }, 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 

    ratings: [
        {
            user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
            },
            rating: {
            type: Number,
            min: 1,
            max: 5
            }
        }
    ],

}, 
{
    timestamps: true,
})

export const Task = mongoose.model('Task', taskSchema);
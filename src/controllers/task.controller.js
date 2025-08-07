import express from 'express';
import { User } from './user.controllers.js';
import { Task } from '../models/task.model.js'; 

const createTask = async (req, res ) => {
    try {
        const { title , description , dueDate } = req.body;
        if (!title) {
            return res.status(404).json({message: " Title is required."});
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized. No user info." });
        }
        
        const task = await Task.create({
            title, 
            description,
            dueDate,
            createdBy: req.user._id
        })

        return res.status(201).json({message: " Task created Successfully.", task});
    } catch (error) {
        return res.status(500).json({message: "Error in creating task." , error: error.message});
    }
} 

export {
    createTask,

}
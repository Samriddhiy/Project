import { Task } from '../models/task.model.js'; 
import { User } from "../models/user.model.js"

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

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate } = req.body;

        if (!id) {
            return res.status(404).json({ message: "Task Id is required."});
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, dueDate },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." });
        }



        return res.status(200).json({message: " Task updated successfully.", updatedTask})
        
    } catch (error) {
        return res.status(402).json({ message: " Error in updating." , error: error.message});
    }
}

const deleteTask = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Task Id is required." });
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found." });
        }
        
        return res.status(200).json({message: " Task deleted successfully." , deletedTask})
    } catch (error) {
        return res.status(400).json({ message: "Error in deleting the task." , error: error.message});
    }
}

export {
    createTask,
    updateTask,
    deleteTask

}
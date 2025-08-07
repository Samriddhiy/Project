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


const rateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const task = await Task.findById( id );
    if (!task) {
        return res.status(404).json({ message: "Task not found"});
    } 

    const existingRating = task.ratings.find(r => r.user.toString() === req.user._id.toString());
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      task.ratings.push({ user: req.user._id, rating });
    }

    await task.save();
    res.status(200).json({ message: "Task rated successfully", task });

  } catch (error) {
    res.status(500).json({ message: "Error in rating task", error: error.message });
  }
}; 


const getTaskCountPerUser = async (req, res) => {
  try {
    const result = await Task.aggregate([
      {
        $group: {
          _id: "$createdBy",         
          totalTasks: { $sum: 1 }   
        }
      },
      {
        $lookup: {
          from: "users",             
          localField: "_id",         
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },           
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",         
          email: "$user.email",
          totalTasks: 1
        }
      }
    ]);

    res.status(200).json({ message: "Task count per user", data: result });

  } catch (error) {
    res.status(500).json({ message: "Error fetching task count", error: error.message });
  }
};


export {
    createTask,
    updateTask,
    deleteTask, 
    rateTask, 
    getTaskCountPerUser
}
import express from 'express' ; 
const router = express.Router(); 

import {
    createTask,
    deleteTask,
    rateTask,
    updateTask
} from "../controllers/task.controller.js"

import authorized from '../middleware/auth.middleware.js';


router.post('/' ,authorized, createTask)
router.put('/:id' , authorized , updateTask )
router.delete('/:id' , authorized , deleteTask)

// rating route 
router.post('/rateTask/:id', authorized, rateTask);

export default router ; 

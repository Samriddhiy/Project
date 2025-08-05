import { User } from '../models/user.model';

const registerUser = async (req, res ) => {
    try {
        const { userName ,email,  password } = req.body; 

        if(! userName|| !email || ! password ){
            return res.send(404).json({ message: "All fields are required."});
        }

        const existingUser = await User.findOne({ email });
        if( existingUser ){
            return res.send(409).json('User already exist.');
        }

        const user = await User.create({
            userName,
            email,
            password,
        })
        
        return res.status(201).json({ message: "User registered successfully." , user})
    } catch (error) {
        return res.status(500).json({ message: " Error in registering the user." , error: error.message});
    }   
} 

export {
    registerUser
}
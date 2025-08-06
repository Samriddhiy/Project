import { User } from '../models/user.model.js'; 
import bcrypt from 'bcrypt';
import generateToken from '../utils/jwt.util.js';

const registerUser = async (req, res ) => {
    try {
        const { userName ,email,  password } = req.body; 

        if(! userName|| !email || ! password ){
            return res.status(404).json({ message: "All fields are required."});
        }

        const existingUser = await User.findOne({ email });
        if( existingUser ){
            return res.status(409).json('User already exist.');
        } 

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
        })
        
        return res.status(201).json({ message: "User registered successfully." , user})
    } catch (error) {
        return res.status(500).json({ message: " Error in registering the user." , error: error.message});
    }   
} 

const loginUser = async (req , res) => {
    try {
        const { email , password } = req.body; 

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const existingUser = await User.findOne({ email });

        if(! existingUser) {
            return res.status(404).json({ message: "No such user exist with this email."})
        }

        const isMatch = await bcrypt.compare(password , existingUser.password );

        if(!isMatch) {
            return res.status(401).json({ message: " Invalid password."})
        } 

        const token = generateToken(existingUser._id); 

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        });

        return res.status(200).json({ message: "User Logged In Successfully." , token, 
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
        }})

        
    } catch (error) {
        return res.status(500).json({ message: "Error occurred during Login." , error: error.message});
    }
}

export {
    registerUser, 
    loginUser,
}
import express, { json } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router();

//register
router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    if(user){
        return res.json({message: "User already exist!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({username, password: hashedPassword});

    await newUser.save();

    res.json({message: "User Registered Successfully"});
});

router.post('/login',async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return json({message: "User Doesn't exist!"});
    }

    const isPassowrdValid = await bcrypt.compare(password, user.password);

    if(!isPassowrdValid){
        return res.json({message: "Username or Password Incorrect!"});
    }

    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id});


});

export {router as userRouter};
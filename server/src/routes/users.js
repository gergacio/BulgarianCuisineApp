import express, { json } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'; //used for hashing passwords
import { UserModel } from "../models/Users.js";

const router = express.Router();

//routes

//register
router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username: username});

    if(user){
        return res.json({message: "User already exist!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //add data to db with mongoose

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
    //algo for hashing always return same value so we can compare (no unhashed exist)

    if(!isPassowrdValid){
        return res.json({message: "Username or Password Incorrect!"});
    }

    const token = jwt.sign({id: user._id}, "secret");
    //token is string but can converted in object, use secret to verify it
    res.json({token, userID: user._id});


});

export {router as userRouter};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret", (err) => {
            if(err) return res.sendStatus(403);
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

//JSON web Token and MERN
//when we login we use token to represent our login session
//when users do request they have to prove they are original users which login
//when users make requests we have to validate that they are authenticated users
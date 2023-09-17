const asyncHandler = require("express-async-handler");
const  bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const  User = require("../models/userModel");



const registerUser = asyncHandler(async (req,res) => {
    const {username,password,email} = req.body;   
    if(!username || !password || !email)
    {
        res.status(400);
        throw new Error("All fild are mandatory");
    }   
    const userAvailable = await User.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already register");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const useCreater = await User.create({
        username,
        password: hashedPassword,
        email
    });
    if(useCreater)
    {
        res.status(200).json({_id: useCreater.id,email:useCreater.email,username:useCreater.username,});

    }else{
        res.status(400);
        throw new Error("User data not valid");
    }
        
}) ;

const loginUser = asyncHandler(async(req,res) => {
    const {password,email} = req.body;
    if(!password || !email)
    {
        res.status(400);
        throw new Error("All fild are mandatory");
    }
    const user = await User.findOne({email});
    if (user && await bcrypt.compare(password, user.password))
    {
       const accessToken = jwt.sign({
            user : {
                username: user.username,
                email: user.email,
                id : user.id
            }
       },
       process.env.ACCESS_TOKEN_SECRET,
       { expiresIn:"30m" }
       );
       res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Cadinshial Not Match");
    }
}) ;

const currentUser = asyncHandler(async(req,res) => {
    res.json(req.user);
}) ;

module.exports = {registerUser,loginUser,currentUser};
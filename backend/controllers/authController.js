const User=require("../models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

exports.register=async (req,res)=>{
    try {
        const {name,email,password}=req.body
        const existingUser=await User.findOne({email})
        if (existingUser) return res.status(400).json({msg:"Email already registered"})
        const hashed=await bcrypt.hash(password,10)
        const user=new User({
            name,
            email,
            password:hashed
        })
         await user.save();

        // Create token
        const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
        );

        // Send everything back
        res.status(201).json({
        msg: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        token,
        });  
    } catch (err) {
        console.log("REGISTER ERROR:", err);
        res.status(500).json({error:err.message})
    }
}

exports.login=async (req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if (!user) return res.status(400).json({msg:"User not found"})
        const isMatch=await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(400).json({msg:"Invalid Credentials"})
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )
        res.json({
        msg: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        token,
        });
    } catch (err) {
        console.log("LOGIN ERROR:", err);
        res.status(500).json({error:err.message})
    }
}

exports.me=async (req,res)=>{
    try {
        const user=await User.findById(req.user).select("-password")
        res.json(user)    
    } catch (err) {
        res.status(500).json({error:err.message})    
    }
    
}
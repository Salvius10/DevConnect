const User=require("../models/User")

exports.getUserProfiles=async (req,res)=>{
    try {
        const user=await User.findById(req.params.id).select("-password")
        res.json(user)    
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

exports.updateProfile=async (req,res)=>{
    try {
        const {bio,skills,location,github}=req.body
        const updatedUser=await User.findByIdAndUpdate(req.user,{
            bio,
            skills,
            location,
            github
        },{new:true}.select("-password"))
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json({error:err.message})
    } 
}
const User=require("../models/User")

exports.getUserProfiles=async (req,res)=>{
    try {
        const user=await User.findById(req.params.id).select("-password")
        if (!user) return res.status(404).json({ msg: "User not found" });
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
        },{new:true}).select("-password")
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json({error:err.message})
    } 
}

exports.followUser=async (req,res)=>{
    try {
        const userId=req.user
        const targetId=req.params.id
        if (userId==targetId){
            return res.status(400).json({msg:"You cannot follow yourself"})
        }
        const targetUser=await User.findByIdAndUpdate(targetId,{
            $addToSet:{followers:userId}
        },{new:true}).select("-password")

        if (!targetUser){
            return res.status(404).json({msg:"User not found"})
        }

        await User.findByIdAndUpdate(userId,{
            $addToSet:{following:targetId}
        },{new:true})

        res.json(targetUser)    
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

exports.unfollowUser=async (req,res)=>{
    try {
        const userId=req.user
        const targetId=req.params.id
        if (userId==targetId){
            return res.status(400).json({msg:"You cannot unfollow yourself"})
        }
        const targetUser=await User.findByIdAndUpdate(targetId,{
            $pull:{followers:userId}
        },{new:true}).select("-password")
        
        if (!targetUser){
            return res.status(404).json({msg:"User not found"})
        }

        await User.findByIdAndUpdate(userId,{
            $pull:{following:targetId}
        },{new:true})

        res.json(targetUser)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}
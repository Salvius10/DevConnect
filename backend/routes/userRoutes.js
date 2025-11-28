const express=require("express")
const router=express.Router()
const upload=require("../middleware/upload")
const {getUserProfiles,updateProfile,followUser,unfollowUser}=require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const User=require("../models/User")
router.post("/upload-photo",authMiddleware,upload.single("photo"),async (req,res)=>{
    try {
        const photoPath=req.file.path
        const user=await User.findByIdAndUpdate(
            req.user,
            {profilephoto:photoPath},
            {new:true}
        )
        res.json(user)    
    } catch (err) {
        res.status(500).json({error:err.message})
    }
    
})
router.get("/",authMiddleware,async (req,res)=>{
    try {
        const users=await User.find().select("-password")
        res.json(users)    
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})
router.post("/follow/:id", authMiddleware, followUser);
router.post("/unfollow/:id", authMiddleware, unfollowUser);
router.get("/search",authMiddleware,async (req,res)=>{
    try {
        const {name,skills,location}=req.query
        const filters={}
        if (name){
            filters.name={$regex:name,$options:"i"}
        }
        if (skills){
            filters.skills={$regex:skills,$options:"i"}
        }
        if (location){
            filters.location={$regex:location,$options:"i"}
        }
        const users=await User.find(filters).select("-password")
        res.json(users)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
})
router.get("/:id",authMiddleware,getUserProfiles)
router.put("/update",authMiddleware,updateProfile)
module.exports=router
const express=require("express")
const router=express.Router()
const upload=require("../middleware/upload")
const auth=require("../middleware/authMiddleware")
const {createPost,getAllPosts,getFeed,toggleLike,addComment,deletePost}=require("../controllers/postController")
const User = require("../models/User")


router.use(auth,async (req,res,next)=>{
    const user=await User.findById(req.user)
    req.userFollowing=user.following
    next()
})
router.post("/",auth,upload.single("image"),createPost)
router.get("/all",getAllPosts)
router.get("/feed",getFeed)
router.put("/like/:id",toggleLike)
router.post("/comment/:id",addComment)
router.delete("/:id",deletePost)

module.exports=router
const express=require("express")
const router=express.Router()
const upload=require("../middleware/upload")
const auth=require("../middleware/authMiddleware")
const {createPost,getAllPosts,getFeed,toggleLike,addComment,deletePost}=require("../controllers/postController")
const User = require("../models/User")



router.post("/",auth,upload.single("image"),createPost)
router.get("/all",auth,getAllPosts)
router.get(
  "/feed",
  auth,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.user);

      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }

      req.userFollowing = user.following || [];
      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  getFeed
);

router.put("/like/:id",auth,toggleLike)
router.post("/comment/:id",auth,addComment)
router.delete("/:id",auth,deletePost)

module.exports=router
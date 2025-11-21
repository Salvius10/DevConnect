const express=require("express")
const router=express.Router()
const {getUserProfiles,updateProfile}=require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/:id",getUserProfiles)
router.put("/update",authMiddleware,updateProfile)

module.exports=router
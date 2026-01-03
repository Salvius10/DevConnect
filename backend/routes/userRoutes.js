const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserProfiles,
  updateProfile,
  followUser,
  unfollowUser
} = require("../controllers/userController");
const User = require("../models/User");

/* Upload profile photo */
router.post("/upload-photo", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const user = await User.findByIdAndUpdate(
      req.user,
      { profilephoto: req.file.path },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Get all developers (except self) */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user } }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Follow / Unfollow */
router.post("/follow/:id", authMiddleware, followUser);
router.post("/unfollow/:id", authMiddleware, unfollowUser);

/* Search developers */
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const { name, skill, location } = req.query;
    const filters = {};

    if (name) filters.name = { $regex: name, $options: "i" };
    if (skill) filters.skills = { $regex: skill, $options: "i" };
    if (location) filters.location = { $regex: location, $options: "i" };

    const users = await User.find(filters).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Get single user profile */
router.get("/:id", authMiddleware, getUserProfiles);

/* Update profile */
router.put("/update", authMiddleware, updateProfile);

module.exports = router;

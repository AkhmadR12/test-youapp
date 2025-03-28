const express = require("express");
const Profile = require("../models/Profile");
const router = express.Router();

// Ambil profile berdasarkan userId
router.get("/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update interest berdasarkan userId
router.put("/:userId/interests", async (req, res) => {
  try {
    const { interests } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      { interests },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

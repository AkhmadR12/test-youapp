const Profile = require('../models/Profile');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update interests
exports.updateInterests = async (req, res) => {
  try {
    const { interests } = req.body;
    
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { interests } },
      { new: true, upsert: true }
    );
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

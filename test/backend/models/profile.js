const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  displayName: String,
  bio: String,
  birthday: String,
  height: String,
  gender: String,
  weight: String,
  horoscope: String,
  zodiac: String,
  interests: [String], // Tambahkan field untuk interest
});

module.exports = mongoose.model("Profile", ProfileSchema);

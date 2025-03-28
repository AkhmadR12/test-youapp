// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const profileRoutes = require("./routes/profile");

// const app = express();
// app.use(cors());
// app.use(express.json());
// // app.use(cors()); // Izinkan frontend mengakses backend
// app.use("/api/profile", profileRoutes);
// const cors = require("cors");
// app.use(cors({ origin: "http://localhost:3000" })); // Sesuaikan dengan frontend

// // const PORT = 3001;
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // Schema untuk profil
// const ProfileSchema = new mongoose.Schema({
//   userId: String,
//   displayName: String,
//   bio: String,
//   birthday: String,
//   height: String,
//   gender: String,
//   weight: String,
//   horoscope: String,
//   zodiac: String,
//   interests: [String],
// });

// const Profile = mongoose.model("Profile", ProfileSchema);

// // API untuk mendapatkan profil berdasarkan userId
// app.get("/api/profile/:userId", async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const profile = await Profile.findOne({ userId });
//     if (!profile) return res.status(404).json({ message: "Profile not found" });
//     res.json(profile);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API untuk memperbarui interest
// app.post("/api/profile/:userId/interests", async (req, res) => {
//   const { userId } = req.params;
//   const { interests } = req.body;
  
//   try {
//     let profile = await Profile.findOne({ userId });

//     if (!profile) {
//       profile = new Profile({ userId, interests });
//     } else {
//       profile.interests = interests;
//     }

//     await profile.save();
//     res.json(profile);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Menjalankan server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  displayName: String,
  bio: String,
  birthday: String,
  height: String,
  gender: String,
  weight: String,
  horoscope: String,
  zodiac: String,
  interests: [String],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
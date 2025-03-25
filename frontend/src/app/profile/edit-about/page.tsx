"use client";

import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Impor useRouter

export default function EditAbout() {
  const router = useRouter(); // Inisialisasi router
  const [form, setForm] = useState({
    displayName: "",
    gender: "",
    birthday: "",
    height: "",
    weight: "",
    horoscope: "--",
    zodiac: "--",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Ambil data dari localStorage saat pertama kali render
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");
    if (savedProfile) {
      setForm(JSON.parse(savedProfile));
    }
  
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "birthday") {
      const { horoscope, zodiac } = getHoroscopeAndZodiac(e.target.value);
      setForm((prev) => ({ ...prev, horoscope, zodiac }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl); // Simpan gambar ke localStorage
    }
  };

  const getHoroscopeAndZodiac = (dateString: string) => {
    const birthDate = new Date(dateString);
    const month = birthDate.getUTCMonth() + 1;
    const day = birthDate.getUTCDate();
    const year = birthDate.getUTCFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    const zodiacSigns = [
      { sign: "Capricorn", symbol: "♑", zodiac: "Goat", start: [12, 22], end: [1, 19] },
      { sign: "Aquarius", symbol: "♒", zodiac: "Water Bearer", start: [1, 20], end: [2, 18] },
      { sign: "Pisces", symbol: "♓", zodiac: "Fish", start: [2, 19], end: [3, 20] },
      { sign: "Aries", symbol: "♈", zodiac: "Ram", start: [3, 21], end: [4, 19] },
      { sign: "Taurus", symbol: "♉", zodiac: "Bull", start: [4, 20], end: [5, 20] },
      { sign: "Gemini", symbol: "♊", zodiac: "Twins", start: [5, 21], end: [6, 21] },
      { sign: "Cancer", symbol: "♋", zodiac: "Crab", start: [6, 22], end: [7, 22] },
      { sign: "Leo", symbol: "♌", zodiac: "Lion", start: [7, 23], end: [8, 22] },
      { sign: "Virgo", symbol: "♍", zodiac: "Virgin", start: [8, 23], end: [9, 22] },
      { sign: "Libra", symbol: "♎", zodiac: "Balance", start: [9, 23], end: [10, 23] },
      { sign: "Scorpio", symbol: "♏", zodiac: "Scorpion", start: [10, 24], end: [11, 21] },
      { sign: "Sagittarius", symbol: "♐", zodiac: "Archer", start: [11, 22], end: [12, 21] },
    ];

    const foundZodiac = zodiacSigns.find(
      (z) =>
        (month === z.start[0] && day >= z.start[1]) ||
        (month === z.end[0] && day <= z.end[1])
    );

    return {
      horoscope: foundZodiac ? `${foundZodiac.symbol} ${foundZodiac.sign}` : "--",
      zodiac: foundZodiac ? foundZodiac.zodiac : "--",
      age,
    };
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(form));
    localStorage.setItem("profileImage", profileImage || ""); // Simpan gambar ke localStorage
    alert("Profile updated successfully!");
    router.push("/profile");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg text-white">
      <h2 className="text-xl font-semibold text-center mb-4">Edit About</h2>

      {/* Profile Image Upload */}
      <div className="flex items-center mb-4">
        <label className="w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full cursor-pointer">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <Camera size={30} />
          )}
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
        <span className="ml-4">Add Image</span>
      </div>

      {/* Form Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm">Display Name</label>
          <input
            type="text"
            name="displayName"
            placeholder="Enter name"
            className="w-full p-3 bg-gray-800 rounded"
            value={form.displayName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm">Gender</label>
          <select
            name="gender"
            className="w-full p-3 bg-gray-800 rounded"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Birthday</label>
          <input
            type="date"
            name="birthday"
            className="w-full p-3 bg-gray-800 rounded"
            value={form.birthday}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm">Horoscope</label>
          <input
            type="text"
            name="horoscope"
            value={form.horoscope}
            className="w-full p-3 bg-gray-800 rounded text-gray-400"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm">Zodiac</label>
          <input
            type="text"
            name="zodiac"
            value={form.zodiac}
            className="w-full p-3 bg-gray-800 rounded text-gray-400"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm">Height</label>
          <input
            type="text"
            name="height"
            placeholder="Add height"
            className="w-full p-3 bg-gray-800 rounded"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm">Weight</label>
          <input
            type="text"
            name="weight"
            placeholder="Add weight"
            className="w-full p-3 bg-gray-800 rounded"
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        className="mt-6 w-full p-3 bg-green-600 rounded text-white font-semibold"
        onClick={handleSave}
      >
        Save & Update
      </button>
    </div>
  );
}

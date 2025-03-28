"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MoreVertical, Edit3 } from "lucide-react";
import Chat from "@/components/Chat"; // Import komponen Chat

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser ] = useState<{ username: string } | null>(null);
  const [profile, setProfile] = useState({
    displayName: "",
    bio: "",
    birthday: "",
    height: "",
    gender: "",
    weight: "",
    horoscope: "",
    zodiac: "",
    interests: [] as string[],
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // State untuk mengontrol tampilan chat

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const storedUser  = localStorage.getItem("user");
    if (storedUser ) {
      setUser (JSON.parse(storedUser ));
    }
    const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");

    // Cek apakah interest tersimpan dalam array
    const interestsArray = Array.isArray(savedProfile.interests) ? savedProfile.interests : [];
    setProfile({
      ...savedProfile,
      interests: interestsArray, // Pastikan interest selalu berupa array
    });

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
    // fetchProfile();
  }, [router]);


  const calculateAge = (birthdate: string) => {
    if (!birthdate) return "-";
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft size={24} className="text-gray-400" />
        </button>
        <h1 className="text-lg font-semibold">@{user?.username}</h1>
        <button className="p-2">
          <MoreVertical size={24} className="text-gray-400" />
        </button>
      </div>

      {/* Bio Section */}
      <div className={`relative p-4 rounded-lg mb-4 ${profileImage ? "bg-cover bg-center" : "bg-[#161B22]"}`} style={{ backgroundImage: profileImage ? `url(${profileImage})` : "none" }}>
      <textarea className="w-full bg-transparent text-white text-sm outline-none resize-none" rows={3} placeholder="@johndoe123" value={profile.displayName} readOnly />
      <p className="text-sm text-white mb-2">Gender: {profile.gender || "Not specified"}</p>

      {/* Horoscope & Zodiac */}
      <div className="flex justify-start mb-2 space-x-2">
        <div className="bg-gray-800 rounded-full px-4 py-2">
          <span className="text-xs text-white">{profile.horoscope || "No Horoscope"}</span>
        </div>
        <div className="bg-gray-800 rounded-full px-4 py-2">
          <span className="text-xs text-white">{profile.zodiac || "No Zodiac"}</span>
        </div>
      </div>

      <button className="absolute top-2 right-2">
        <Edit3 size={16} className="text-gray-400" />
      </button>
    </div>

      {/* About Section */}
      <div className="relative bg-[#161B22] p-4 rounded-lg mb-4">
      <p className="text-sm font-semibold text-white mb-1">About</p>
      {profile.displayName ? (
        <>
          <p className="text-xs text-gray-400">
            Birthday: <span className="text-sm font-bold text-white mb-1">{profile.birthday ? `${profile.birthday} (Age: ${calculateAge(profile.birthday)})` : "-"}</span>
          </p>
          <p className="text-xs text-gray-400">
            Horoscope: <span className="text-sm font-bold text-white mb-1">{profile.horoscope || "-"}</span>
          </p>
          <p className="text-xs text-gray-400">
            Zodiac: <span className="text-sm font-bold text-white mb-1">{profile.zodiac || "-"}</span>
          </p>
          <p className="text-xs text-gray-400">
            Height: <span className="text-sm font-bold text-white mb-1">{profile.height ? `${profile.height} cm` : "-"}</span>
          </p>
          <p className="text-xs text-gray-400">
            Weight: <span className="text-sm font-bold text-white mb-1">{profile.weight ? `${profile.weight} kg` : "-"}</span>
          </p>
        </>
      ) : (
        <p className="text-xs text-gray-400">Add in your info to help others know you better</p>
      )}
      <button className="absolute top-2 right-2" onClick={() => router.push("/profile/edit-about")}>
        <Edit3 size={16} className="text-gray-400 hover:text-gray-200" />
      </button>
    </div> {/* Interest Section */}
      <div className="relative bg-[#161B22] p-4 rounded-lg">
        <p className="text-sm font-semibold text-white mb-1">Interest</p>

        {profile.interests && profile.interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
                <span key={index} className="bg-[#0D1117] px-3 py-1 rounded-full border border-gray-500 text-xs text-white">
                {interest}
                </span>
            ))}
            </div>
        ) : (
            <p className="text-xs text-gray-400">Add your interests to find a better match</p>
        )}

        <button className="absolute top-2 right-2" onClick={() => router.push("/profile/edit-interest")}>
            <Edit3 size={16} className="text-gray-400" />
        </button>
        </div>
         {/* Chat Icon */}
         <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg"
          >
            Chat
          </button>

      {/* Tampilkan komponen Chat jika isChatOpen true */}
      {isChatOpen && <Chat onClose={() => setIsChatOpen(false)} />}

    </div>
  );
}

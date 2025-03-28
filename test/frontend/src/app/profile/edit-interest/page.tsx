"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";

export default function EditInterestPage() {
  const router = useRouter();
  const [interests, setInterests] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
    console.log("Loaded profile from localStorage:", savedProfile); // Debugging
    if (savedProfile.interests) {
      setInterests(savedProfile.interests);
    }
  }, []);

  const handleSave = () => {
    const updatedProfile = { ...JSON.parse(localStorage.getItem("profile") || "{}"), interests };
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
    console.log("Profile updated:", updatedProfile); // Debugging
    router.push("/profile");
  };
  // const handleSave = async () => {
  //   const updatedProfile = { interests };
  //   await fetch(`/api/profile/${user.username}/interests`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedProfile),
  //   });
  //   router.push("/profile");
  // };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!interests.includes(input.trim())) {
        setInterests([...interests, input.trim()]);
      }
      setInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((item) => item !== interest));
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft size={24} className="text-gray-400" />
        </button>
        <button onClick={handleSave} className="text-[#58A6FF] text-sm font-medium">
          Save
        </button>
      </div>

      {/* Title */}
      <p className="text-xs text-[#C9D1D9] mb-1">Tell everyone about yourself</p>
      <h1 className="text-xl font-semibold text-white mb-4">What interest you?</h1>

      {/* Interest Input & Tags */}
      <div className="bg-[#161B22] p-3 rounded-lg border border-gray-600">
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <div key={index} className="flex items-center bg-[#0D1117] text-white px-3 py-1 rounded-full border border-gray-500">
              <span className="text-sm">{interest}</span>
              <button onClick={() => removeInterest(interest)} className="ml-2">
                <X size={14} className="text-gray-400" />
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-white text-sm p-2 outline-none mt-2"
          placeholder="Type your interests and press Enter..."
        />
      </div>
    </div>
  );
}

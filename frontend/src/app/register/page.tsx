"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State untuk mengontrol status tombol

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Cek apakah semua field terisi
    if (form.username && form.email && form.password && form.confirmPassword) {
      setIsButtonDisabled(false); // Aktifkan tombol jika semua terisi
    } else {
      setIsButtonDisabled(true); // Nonaktifkan tombol jika salah satu kosong
    }
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi input tidak boleh kosong
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      alert("All fields are required!");
      return;
    }

    // Validasi panjang password
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // Validasi password harus sama
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simpan user ke localStorage
    localStorage.setItem("user", JSON.stringify({
      username: form.username,
      email: form.email,
      password: form.password,
    }));

    alert("Registration successful!");
    router.push("/login"); // Redirect ke Login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1F4247] to-[#09141A] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={handleChange}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-800 rounded pr-10"
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 bg-gray-800 rounded"
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button 
          type="submit" 
          className={`w-full p-3 rounded ${isButtonDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} 
          disabled={isButtonDisabled} // Nonaktifkan tombol jika isButtonDisabled true
        >
          Register
        </button>
      </form>
      <p className="mt-4">
        Have an account? <a href="/login" className="text-blue-400">Login here</a>
      </p>
    </div>
  );
}

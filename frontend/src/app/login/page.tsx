"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State untuk mengontrol status tombol

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Cek apakah email dan password terisi
    if (form.email && form.password) {
      setIsButtonDisabled(false); // Aktifkan tombol jika keduanya terisi
    } else {
      setIsButtonDisabled(true); // Nonaktifkan tombol jika salah satu kosong
    }
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser  = localStorage.getItem("user");
    if (!storedUser ) {
      alert("User  not found, please register first!");
      return;
    }

    const user = JSON.parse(storedUser );
    if (user.email === form.email && user.password === form.password) {
      localStorage.setItem("isAuthenticated", "true"); // Simpan status login
      router.push("/profile"); // Redirect ke Profile
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1F4247] to-[#09141A] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-800 rounded"
          onChange={handleChange}
        />
        <button 
          type="submit" 
          className={`w-full p-3 rounded ${isButtonDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`} 
          disabled={isButtonDisabled} // Nonaktifkan tombol jika isButtonDisabled true
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account? <a href="/register" className="text-blue-400">Register here</a>
      </p>
    </div>
  );
}

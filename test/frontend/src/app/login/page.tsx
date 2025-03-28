"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setIsButtonDisabled(!(form.email && form.password));
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password!");
      }

      const data = await response.json();

      // Simpan token dan user ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isAuthenticated", "true");

      alert("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      alert(error.message);
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
          disabled={isButtonDisabled}
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

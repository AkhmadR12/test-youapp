export const fetcher = async (endpoint: string, options = {}) => {
    const res = await fetch(`/api/${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) throw new Error("API error");
    return res.json();
  };
try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password,
      }),
    });
  
    const data = await response.json(); // Ubah ini
    if (!response.ok) {
      throw new Error(data.message || "Registration failed!"); // Perbaiki pesan error
    }
  
    alert("Registration successful!");
    router.push("/login");
  } catch (error) {
    console.error("Error:", error);
    alert(error.message); // Tampilkan error yang lebih jelas
  }
  

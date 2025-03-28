import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ message: "API key tidak dikonfigurasi" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Pesan kosong" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 256,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API Error:", errorBody);
      return res.status(response.status).json({ message: `Gagal mengakses Gemini API: ${errorBody}` });
    }

    const data = await response.json();

    // Periksa apakah respons memiliki teks yang benar
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak mengerti.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Kesalahan lengkap:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
}

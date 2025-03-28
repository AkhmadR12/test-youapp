import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log("Received request body:", req.body); // Debugging request body

      const response = await fetch('http://localhost:3001/profile/edit-about', { // Backend API URL
        method: 'POST',
        headers: {
            },
        body: req.body, // Forward langsung FormData ke backend
      });

      const textResponse = await response.text(); // Ambil respons mentah
      console.log("Backend response:", textResponse); // Debugging respons dari backend

      if (!response.ok) {
        return res.status(response.status).json({ message: textResponse });
      }

      return res.status(200).json({ message: 'Profile updated successfully!' });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

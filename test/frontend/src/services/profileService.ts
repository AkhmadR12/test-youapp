const API_URL = "http://localhost:3001/api/profile";

export async function updateInterests(userId: string, interests: string[]) {
  const response = await fetch(`${API_URL}/${userId}/interests`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interests }),
  });

  if (!response.ok) throw new Error("Failed to update interests");
  return response.json();
}

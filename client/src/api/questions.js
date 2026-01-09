export async function getRandomQuestion() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/questions/random`);

  if (!res.ok) {
    throw new Error("Failed to fetch question");
  }

  return res.json();
}

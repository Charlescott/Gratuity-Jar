export async function getRandomQuestion() {
  const res = await fetch("http://localhost:5000/questions/random");

  if (!res.ok) {
    throw new Error("Failed to fetch question");
  }

  return res.json();
}

import { useEffect, useState } from "react";
import { getRandomQuestion } from "../api/questions";

function Home() {
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRandomQuestion()
      .then(setQuestion)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;
  if (!question) return <p>Loading...</p>;

  return (
    <div>
      <h1>Gratuity Jar</h1>
      <p>{question.prompt}</p>
    </div>
  );
}

export default Home;

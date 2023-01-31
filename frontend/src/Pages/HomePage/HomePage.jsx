import { Button, Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const URL = "/api/question";

async function fetchQuestion() {
  const response = await fetch(URL);
  return await response.json();
}

export default function HomePage() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestion().then((response) => {
      setQuestion(response);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <p>Loading gecc!</p>
  ) : (
    <div>
      <h1>{question.question}</h1>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Button>{question.correctAnswer}</Button>
        </Grid>
        {question.incorrectAnswers.map((answer, index) => (
          <Grid item xs={6}>
            <Button key={index} id={index}>
              {answer}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

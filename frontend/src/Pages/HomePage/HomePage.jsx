import { Button, Card, Grid } from "@mui/material";
import { Container } from "@mui/system";
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
      console.log(response);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <p>Loading gecc!</p>
  ) : (
    <div>
      <Container maxWidth="md">
        <h1 align="center">{question.question}</h1>
        <Grid
          container
          textAlign="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {question.answers.map((answer, index) => (
            <Grid key={index} item xs={6}>
              <Button key={index}>{answer}</Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

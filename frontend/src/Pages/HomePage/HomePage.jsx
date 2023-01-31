import {
  Button,
  Card,
  CircularProgress,
  Grid,
  LinearProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";

const URL = "/api/question";

async function fetchQuestion() {
  const response = await fetch(URL);
  return await response.json();
}

export default function HomePage() {
  const [question, setQuestion] = useState(null);
  const dataFetchedRef = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchQuestion().then((response) => {
      setQuestion(response);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Container maxWidth="md" align="center">
      <CircularProgress></CircularProgress>
    </Container>
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

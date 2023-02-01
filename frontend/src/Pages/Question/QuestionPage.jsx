import { Button, CircularProgress, Container, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Loading from "../../Components/Loading";
import Counter from "./Counter";
import PointDisplay from "./PointDisplay";
import "./QuestionPage.css"

const URL = "/api/question";


export default function QuestionPage() {
    const [question, setQuestion] = useState(null);
    const dataFetchedRef = useRef(false);
    const [loading, setLoading] = useState(true);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const TIME_FOR_QUESTION = 10000;
    let timeLeft = TIME_FOR_QUESTION;
    const [points, setPoints] = useState(0);


    const handleAnswerSubmit = id => {
        console.log(`You clicked answer #${id} in ${(TIME_FOR_QUESTION - timeLeft) / 1000}s!\nSorry, I don't know if its correct... 😒`);
    }

    async function fetchQuestion() {
        const response = await fetch(URL);
        const data = await response.json();
        setQuestion(data);
        setLoading(false);
    }

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchQuestion()
    }, [timeLeft, loading]);

    const handleTick = tickObject => timeLeft = tickObject.total;

    const handleTimeOut = () => {
        setIsTimeOut(true);
        setTimeout(() => {
            setIsTimeOut(false);
            setLoading(true);
            fetchQuestion();
        }, 1000)
    }

    return isTimeOut ? <Container maxWidth="md" align="center"><h1>You weren't fast enough!</h1></Container> : loading ? <Loading /> : (
        <div>
            <Container maxWidth="md">
                <h1 align="center">{question.question}</h1>
                <Grid
                    container
                    textAlign="center"
                    spacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {question.answers.map((answer, index) => (
                        <Grid key={index} item xs={6}>
                            <Button variant="contained" sx={{ width: "100%" }} size="large" key={index} onClick={() => handleAnswerSubmit(index)}>{answer}</Button>
                        </Grid>
                    ))}
                </Grid>
                <Counter time={TIME_FOR_QUESTION} onTick={handleTick} onComplete={handleTimeOut} />
                <PointDisplay points={points} />
            </Container>
        </div>
    );
}
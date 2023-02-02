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
    const [isFinished, setIsFinished] = useState(false);
    
    const [points, setPoints] = useState(0);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    
    const TIME_FOR_QUESTION = 10000;
    let timeLeft = TIME_FOR_QUESTION;
    
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
    }, [timeLeft, loading, correctAnswerIndex]);

    const submitAnswerAndGetCorrectIndex = index => {
        console.log(`I see that you clicked the answer on index ${index}, but unfortunately I don't know which is correct. For the time, I'll say its on index 0!`);
        return 0;
    }

    const handleAnswerSubmit = index => {
        if (correctAnswerIndex !== null) return;
        setIsFinished(true);
        const correctAnswer = submitAnswerAndGetCorrectIndex(index);
        setCorrectAnswerIndex(correctAnswer);
        if (correctAnswer === index) {
            setPoints(points + 50 + (timeLeft / TIME_FOR_QUESTION) * 50);
        }
        setTimeout(() => {
            setCorrectAnswerIndex(null);
            setLoading(true);
            fetchQuestion().then(() => setIsFinished(false))
        }, 3000);
    }

    const handleTick = tickObject => timeLeft = tickObject.total;

    const handleTimeOut = () => {
        setIsTimeOut(true);
        setIsFinished(true);
        setLoading(true);
        fetchQuestion();
        setTimeout(() => {
            setIsTimeOut(false);
            setIsFinished(false);
        }, 1000)
    }

    return (
        <div>

            <Container maxWidth="md" sx={{minHeight: 250}}>
                {isTimeOut ? <Container maxWidth="md" align="center"><h1>You weren't fast enough!</h1></Container> : loading ? <h1><Loading /></h1> : <>
                    <h1 align="center">{question.question}</h1>
                    <Grid
                        container
                        textAlign="center"
                        spacing={3}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {question.answers.map((answer, index) => (
                            <Grid key={index} item xs={6}>
                                <Button variant="contained" className={correctAnswerIndex === index ? "correct" : null} sx={{ width: "100%" }} size="large" key={index} onClick={() => handleAnswerSubmit(index)}>{answer}</Button>
                            </Grid>
                        ))}
                    </Grid>
                </>}
            </Container>
            <Counter time={TIME_FOR_QUESTION} key={loading} onTick={handleTick} onComplete={handleTimeOut} isFinished={isFinished} />
            <PointDisplay points={points} />
        </div>
    );
}
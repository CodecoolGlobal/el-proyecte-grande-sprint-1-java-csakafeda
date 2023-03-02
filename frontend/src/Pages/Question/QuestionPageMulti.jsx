import {Button, Container, Grid, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import Loading from "../../Components/Loading";
import {getPlayerId} from "../../Tools/userTools";
import Counter from "./Counter";
import PointDisplay from "./PointDisplay";
import "./QuestionPage.css"

export default function QuestionPageMulti() {
    const [question, setQuestion] = useState(null);
    const dataFetchedRef = useRef(false);

    const {gameId} = useParams();

    const [loading, setLoading] = useState(true);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const [points, setPoints] = useState(0);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [endGame, setEndGame] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const QUESTION_NUMBER = 10;

    const TIME_FOR_QUESTION = 10000;
    let timeLeft = TIME_FOR_QUESTION;

    async function fetchNextQuestion() {
        const baseUrl = "/api/question"
        const res = await fetch(`${baseUrl}?gameId=${gameId}&index=${questionIndex}`);
        const data = await res.json();
        setQuestion(data);
        setLoading(false);
        setQuestionIndex(questionIndex + 1);
    }

    async function saveScore() {
        const baseUrl = "/api/playedgame";
        const res = await fetch(`${baseUrl}?gameId=${gameId}&playerId=${getPlayerId()}&score=${points}`, {
            method: "POST"
        });
        return res.statusText;
    }

    useEffect(() => {
        console.log(points);
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        if (questionIndex < QUESTION_NUMBER) {
            fetchNextQuestion();
        } else {
            saveScore().then(() => setEndGame(true));
        }
    }, [timeLeft, loading, correctAnswerIndex]);

    const submitAnswerAndGetCorrectIndex = async index => {
        const resp = await fetch("/api/answer", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId: question.id,
                answerIndex: index
            })
        });
        return await resp.json();
    }

    async function handleAnswerSubmit(index) {
        if (correctAnswerIndex !== null) return;
        submitAnswerAndGetCorrectIndex(index)
            .then(correctAnswer => {
                setCorrectAnswerIndex(correctAnswer);
                if (correctAnswer === index) {
                    let point = points + 50 + (timeLeft / TIME_FOR_QUESTION) * 50
                    setPoints(point);
                    console.log(point);
                    console.log(points);
                }
                setTimeout(() => {
                    setCorrectAnswerIndex(null);
                    setLoading(true);
                    if (questionIndex < QUESTION_NUMBER) {
                        fetchNextQuestion().then(() => setIsFinished(false))
                    } else {
                        saveScore().then(() => setEndGame(true));
                    }
                }, 3000);
            });
        setIsFinished(true);
    }

    const handleTick = tickObject => timeLeft = tickObject.total;

    const handleTimeOut = () => {
        setIsTimeOut(true);
        setIsFinished(true);
        setLoading(true);
        if (questionIndex < QUESTION_NUMBER) {
            fetchNextQuestion();
        } else {
            saveScore().then(() => setEndGame(true));
        }
        setTimeout(() => {
            setIsTimeOut(false);
            setIsFinished(false);
        }, 1000)
    }

    return (
        <div>{endGame ? <Container maxWidth="md" align="center" sx={{marginBlock: 6}}><Typography variant="h2">GAME
            OVER</Typography></Container> : <div>
            <Container maxWidth="md" sx={{minHeight: 250}}>
                {isTimeOut ?
                    <Container maxWidth="md" align="center"><h1>You weren't fast enough!</h1></Container> : loading ?
                        <h1><Loading/></h1> : <>
                            <h1 align="center">{question.question}</h1>
                            <Grid
                                container
                                textAlign="center"
                                spacing={3}
                                columnSpacing={{xs: 1, sm: 2, md: 3}}
                            >
                                {question.answers.map((answer, index) => (
                                    <Grid key={index} item xs={6}>
                                        <Button variant="contained"
                                                className={correctAnswerIndex === index ? "correct" : null}
                                                sx={{width: "100%"}} size="large" key={index}
                                                onClick={() => handleAnswerSubmit(index)}>{answer}</Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </>}
            </Container>
            <Counter time={TIME_FOR_QUESTION} key={loading} onTick={handleTick} onComplete={handleTimeOut}
                     isFinished={isFinished}/>
        </div>}
            <PointDisplay points={points}/>
        </div>
    );
}
import {Button, Container, Grid} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import Loading from "../../Components/Loading";
import Counter from "./Counter";
import PointDisplay from "./PointDisplay";
import "./QuestionPage.css"

export default function QuestionPageSingle() {
    const [question, setQuestion] = useState(null);
    const dataFetchedRef = useRef(false);

    const [loading, setLoading] = useState(true);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const [points, setPoints] = useState(0);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

    const [newGame, setNewGame] = useState(true);
    const [endGame, setEndGame] = useState(false);
    const [gameId, setGameId] = useState(0);
    const [index, setIndex] = useState(0);
    const QUESTION_NUMBER = 10;
    const PLAYER_ID = 1;

    const TIME_FOR_QUESTION = 10000;
    let timeLeft = TIME_FOR_QUESTION;

    async function fetchNextQuestion(index) {
        const baseUrl = "/api/question"
        const res = await fetch(`${baseUrl}?gameId=${gameId}&index=${index}`);
        const data = await res.json();
        setQuestion(data);
        setLoading(false);
    }

    async function createNewGame() {
        const baseUrl = "/api/newgame";
        const res = await fetch(`${baseUrl}?createdBy=${PLAYER_ID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }

    async function saveScore() {
        const baseUrl = "/api/playedgame";
        const res = await fetch(`${baseUrl}?gameId=${gameId}&playerId=${PLAYER_ID}&score=${points}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return res.statusText;
    }

    useEffect(() => {
        if (newGame) {
            createNewGame().then(res => {
                setGameId(res);
                setNewGame(false);
            })
        }
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        if (index < QUESTION_NUMBER) {
            fetchNextQuestion();
            setIndex(index + 1);
        } else {
            setEndGame(true);
            saveScore();
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

    const handleAnswerSubmit = index => {
        if (correctAnswerIndex !== null) return;
        setIsFinished(true);
        submitAnswerAndGetCorrectIndex(index).then(correctAnswer => {
            setCorrectAnswerIndex(correctAnswer);
            if (correctAnswer === index) {
                setPoints(points + 50 + (timeLeft / TIME_FOR_QUESTION) * 50);
            }
            setTimeout(() => {
                setCorrectAnswerIndex(null);
                setLoading(true);
                fetchNextQuestion().then(() => setIsFinished(false))
            }, 3000);
        })
    }

    const handleTick = tickObject => timeLeft = tickObject.total;

    const handleTimeOut = () => {
        setIsTimeOut(true);
        setIsFinished(true);
        setLoading(true);
        fetchNextQuestion();
        setTimeout(() => {
            setIsTimeOut(false);
            setIsFinished(false);
        }, 1000)
    }

    return (
        <div>{endGame ? <h1>GAME OVER</h1> : <div>
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
package com.example.quizio.service;

import com.example.quizio.controller.dto.Answer;
import com.example.quizio.controller.dto.QuestionDTO;
import com.example.quizio.controller.dao.TriviaApiDAO;
import com.example.quizio.database.AnswerDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@Service
public class QuestionService {
    private static final int LIMIT_NUMBER = 1;
    private static final String URL = "https://the-trivia-api.com/api/questions";
    private RestTemplate restTemplate = new RestTemplate();
    private final AnswerDB answerDB;

    @Autowired
    public QuestionService(AnswerDB answerDB) {
        this.answerDB = answerDB;
    }

    public QuestionDTO provideQuestionWithAllAnswers(TriviaApiDAO questionFromApi) {

        List<String> answers = new ArrayList<>();
        Collections.addAll(answers, questionFromApi.incorrectAnswers());

        Random random = new Random();
        int randomIndex = random.nextInt(3);
        answers.add(randomIndex, questionFromApi.correctAnswer());

        Answer answer = Answer.builder()
                .questionId(questionFromApi.id())
                .answerIndex(randomIndex)
                .build();
        answerDB.addToAnswerDB(answer);
        return new QuestionDTO(
                questionFromApi.category(),
                questionFromApi.id(), answers.toArray(
                answers.toArray(new String[4])),
                questionFromApi.question());
    }

    public TriviaApiDAO getQuestionFromTriviaApi() {
        TriviaApiDAO currentQuestion = null;
        TriviaApiDAO[] questions = restTemplate.getForObject(URL + "?limit=" + LIMIT_NUMBER, TriviaApiDAO[].class);
        if (questions == null || questions.length == 0) {
            throw new IllegalStateException();
        } else {
            currentQuestion = questions[0];
            return currentQuestion;
        }
    }

    public TriviaApiDAO getQuestionByDifficulty(String difficulty) {
        return List.of(Objects.requireNonNull(restTemplate
                        .getForObject(URL + "?difficulty=" + difficulty + "&limit=" + LIMIT_NUMBER, TriviaApiDAO[].class)))
                .get(0);
    }

    public TriviaApiDAO getQuestionsByCategory(String category) {
        return List.of(Objects.requireNonNull(restTemplate
                        .getForObject(URL + "?limit=" + LIMIT_NUMBER + "&categories=" + category, TriviaApiDAO[].class)))
                .get(0);
    }
}

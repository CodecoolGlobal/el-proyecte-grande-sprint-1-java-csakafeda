package com.example.quizio.service;

import com.example.quizio.controller.dao.QuestionDAO;
import com.example.quizio.controller.dao.TriviaApiDAO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
public class QuestionService {
    private static final int LIMIT_NUMBER = 1;
    private static final String URL = "https://the-trivia-api.com/api/questions";

    public QuestionService() {
    }

    public QuestionDAO provideQuestionWithAllAnswers() {
        TriviaApiDAO questionFromApi = getQuestionFromTriviaApi();

        List<String> answers = new ArrayList<>();
        Collections.addAll(answers, questionFromApi.incorrectAnswers());
        Random random = new Random();
        int randomIndex = random.nextInt(3);
        answers.add(randomIndex, questionFromApi.correctAnswer());

        QuestionDAO question = new QuestionDAO(
                questionFromApi.category(),
                questionFromApi.id(), answers.toArray(
                answers.toArray(new String[4])),
                questionFromApi.question());

        return question;
    }

    public TriviaApiDAO getQuestionFromTriviaApi() {
        TriviaApiDAO currentQuestion = null;
        RestTemplate restTemplate = new RestTemplate();
        TriviaApiDAO[] questions = restTemplate.getForObject(URL + "?limit=" + LIMIT_NUMBER, TriviaApiDAO[].class);
        if (questions == null || questions.length == 0) {
            throw new IllegalStateException();
        } else {
            currentQuestion = questions[0];
            return currentQuestion;
        }
    }

}

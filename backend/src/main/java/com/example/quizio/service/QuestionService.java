package com.example.quizio.service;

import com.example.quizio.controller.dao.QuestionDAO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class QuestionService {
    private static final int LIMIT_NUMBER = 1;
    private static final String URL = "https://the-trivia-api.com/api/questions";

    public QuestionService() {
    }

    public QuestionDAO provideQuestionWithAllAnswers() {
        QuestionDAO question = getQuestionFromTriviaApi();
        List<String> answers = new ArrayList<>();
        answers.add(question.correctAnswer());
        Collections.addAll(answers, question.incorrectAnswers());
        Collections.shuffle(answers);
        String[] allAnswers = answers.toArray(String[]::new);
        QuestionDAO questionWithAllAnswers = new QuestionDAO(
                question.category(), question.id(),
                null, null,
                allAnswers, question.question(),
                question.tags(), question.type(),
                question.difficulty(), question.regions(),
                question.isNiche());
        return questionWithAllAnswers;
    }

    public QuestionDAO getQuestionFromTriviaApi() {
        QuestionDAO currentQuestion = null;
        RestTemplate restTemplate = new RestTemplate();
        QuestionDAO[] questions = restTemplate.getForObject(URL + "?limit=" + LIMIT_NUMBER, QuestionDAO[].class);
        if (questions == null || questions.length == 0) {
            throw new IllegalStateException();
        } else {
            currentQuestion = questions[0];
            return currentQuestion;
        }
    }

}

package com.example.quizio.service;

import com.example.quizio.controller.dto.AnswerDTO;
import com.example.quizio.controller.dto.QuestionDTO;
import com.example.quizio.controller.dao.TriviaApiDAO;
import com.example.quizio.database.AnswerDB;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final AnswerDB answerDB;

    @Autowired
    public QuestionService(AnswerDB answerDB) {
        this.answerDB = answerDB;
    }

    public QuestionDTO provideQuestionWithAllAnswers() {
        TriviaApiDAO questionFromApi = getQuestionFromTriviaApi();

        System.out.println(questionFromApi.id());

        List<String> answers = new ArrayList<>();
        Collections.addAll(answers, questionFromApi.incorrectAnswers());

        Random random = new Random();
        int randomIndex = random.nextInt(3);
        answers.add(randomIndex, questionFromApi.correctAnswer());
        System.out.println(randomIndex);

        AnswerDTO answer = new AnswerDTO(questionFromApi.id(), randomIndex);

        System.out.println(answer);
        answerDB.addToAnswerDB(answer);

        return new QuestionDTO(
                questionFromApi.category(),
                questionFromApi.id(), answers.toArray(
                answers.toArray(new String[4])),
                questionFromApi.question());
    }

    public TriviaApiDAO getQuestionFromTriviaApi() {
        TriviaApiDAO currentQuestion;
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

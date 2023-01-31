package com.example.quizio.controller;

import com.example.quizio.controller.dao.QuestionDAO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;


@RestController
public class QuestionController {
    private static final String LIMIT_NUMBER = "1";
    private static final String URL = "https://the-trivia-api.com/api/questions";
    private RestTemplate restTemplate = new RestTemplate();

    @GetMapping("question")
    public QuestionDAO getQuestion() {
        QuestionDAO newQuestion = null;
        try {
            QuestionDAO[] questions = restTemplate.getForObject(URL + "?limit=" + LIMIT_NUMBER, QuestionDAO[].class);
            newQuestion = questions[0];
        } catch (NullPointerException exception) {
            System.out.println(exception.getMessage());
        }
        return newQuestion;
    }

    @GetMapping("question/difficulty/{difficulty}")
    public QuestionDAO getQuestionByDifficulty(@PathVariable String difficulty) {
        return List.of(Objects.requireNonNull(restTemplate
                        .getForObject(URL + "?difficulty=" + difficulty + "&limit=" + LIMIT_NUMBER, QuestionDAO[].class)))
                .get(0);
    }

    /*@GetMapping("question/tag/{tag}")
    public QuestionDAO getQuestionByTag(@PathVariable String tag) {
        return List.of(Objects.requireNonNull(restTemplate
                        .getForObject(URL + "?limit=" + LIMIT_NUMBER, QuestionDAO[].class)))
                .get(0);
    }*/

}

package com.example.quizio.controller;

import com.example.quizio.controller.dao.QuestionDAO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
public class QuestionController {
    private static final String LIMIT_NUMBER = "1";
    private static final String URL = "https://the-trivia-api.com/api/questions";

    @GetMapping("question")
    public QuestionDAO getQuestion() {
        System.out.println("GET");
        QuestionDAO newQuestion = null;
        try {
            RestTemplate restTemplate = new RestTemplate();
            QuestionDAO[] questions = restTemplate.getForObject(URL + "?limit=" + LIMIT_NUMBER, QuestionDAO[].class);
            newQuestion = questions[0];
        } catch (NullPointerException exception) {
            System.out.println(exception.getMessage());
        }
        return newQuestion;
    }


}

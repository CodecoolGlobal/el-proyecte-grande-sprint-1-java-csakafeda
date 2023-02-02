package com.example.quizio.controller;

import com.example.quizio.controller.dto.QuestionDTO;
import com.example.quizio.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;


@RestController
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("question")
    public QuestionDTO getQuestion() {
        return questionService.provideQuestionWithAllAnswers();
        return List.of(Objects.requireNonNull(restTemplate
                        .getForObject(URL + "?limit=" + LIMIT_NUMBER, QuestionDAO[].class)))
                .get(0);
    }

    @GetMapping("question/difficulty/{difficulty}")
    public QuestionDAO getQuestionByDifficulty(@PathVariable String difficulty) {
        return List.of(Objects.requireNonNull(restTemplate
                        .getForObject(URL + "?difficulty=" + difficulty + "&limit=" + LIMIT_NUMBER, QuestionDAO[].class)))
                .get(0);
    }

    @GetMapping("question/category/{category}")
    public QuestionDAO getQuestionByCategory(@PathVariable String category) {
        return List.of(Objects.requireNonNull(restTemplate
                        .getForObject(URL + "?limit=" + LIMIT_NUMBER + "&categories=" + category, QuestionDAO[].class)))
                .get(0);
    }

}

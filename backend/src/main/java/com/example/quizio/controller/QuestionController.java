package com.example.quizio.controller;

import com.example.quizio.controller.dao.QuestionDAO;
import com.example.quizio.controller.dao.TriviaApiDAO;
import com.example.quizio.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuestionController {

    private final QuestionService questionService = new QuestionService();

    @Autowired
    public QuestionController(QuestionService questionService) {
    }

    @GetMapping("question")
    public QuestionDAO getQuestion() {
        return questionService.provideQuestionWithAllAnswers();
    }
}

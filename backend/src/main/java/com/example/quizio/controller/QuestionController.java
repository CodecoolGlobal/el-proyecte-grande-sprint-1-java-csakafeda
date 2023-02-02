package com.example.quizio.controller;

import com.example.quizio.controller.dto.QuestionDTO;
import com.example.quizio.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
    }
}

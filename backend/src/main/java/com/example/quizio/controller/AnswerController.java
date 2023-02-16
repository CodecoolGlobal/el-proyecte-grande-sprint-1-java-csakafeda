package com.example.quizio.controller;

import com.example.quizio.database.repository.PlayerAnswer;
import com.example.quizio.controller.dto.AnswerDTO;
import com.example.quizio.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping("answer")
    public int getUserAnswer(@RequestBody AnswerDTO answer) {
        return answerService.correctAnswerProvider(PlayerAnswer.builder().questionId(answer.questionId()).answerIndex(answer.answerIndex()).build());
    }
}

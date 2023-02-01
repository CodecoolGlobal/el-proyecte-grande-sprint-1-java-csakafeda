package com.example.quizio.controller;

import com.example.quizio.controller.dao.AnswerDAO;
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
    public void getUserAnswer(@RequestBody AnswerDAO answer) {
        System.out.println(answerService.isAnswerCorrect(answer));
    }


}

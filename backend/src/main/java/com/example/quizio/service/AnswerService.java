package com.example.quizio.service;

import com.example.quizio.controller.dto.AnswerDTO;
import com.example.quizio.database.AnswerDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {

    private final AnswerDB answerDB;

    @Autowired
    public AnswerService(AnswerDB answerDB) {
        this.answerDB = answerDB;
    }

    public int correctAnswerProvider(AnswerDTO userAnswer) {
        String userAnswerId = userAnswer.questionId();
        return answerDB.getCorrectAnswers()
                .stream().filter(answerDTO -> answerDTO.questionId()
                        .equals(userAnswerId)).findFirst().orElseThrow().answerIndex();
    }
}

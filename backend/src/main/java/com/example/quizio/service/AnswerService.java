package com.example.quizio.service;

import com.example.quizio.controller.dto.Answer;
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

    public int correctAnswerProvider(Answer userAnswer) {
        String userAnswerId = userAnswer.getQuestionId();
        return answerDB.getCorrectAnswers()
                .stream().filter(answerDTO -> answerDTO.getQuestionId()
                        .equals(userAnswerId)).findFirst().orElseThrow().getAnswerIndex();
    }
}

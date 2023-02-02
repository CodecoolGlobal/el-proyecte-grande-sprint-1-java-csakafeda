package com.example.quizio.service;

import com.example.quizio.controller.dto.AnswerDTO;
import com.example.quizio.database.AnswerDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AnswerService {

    private final AnswerDB answerDB;

    @Autowired
    public AnswerService(AnswerDB answerDB) {
        this.answerDB = answerDB;
    }

    public int correctAnswerProvider(AnswerDTO userAnswer) {
        return answerDB.getCorrectAnswers()
                .stream().filter(answerDTO -> answerDTO.equals(userAnswer)).findFirst().get().answerIndex();
    }
}

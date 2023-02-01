package com.example.quizio.service;

import com.example.quizio.controller.dao.AnswerDAO;
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

    public Boolean isAnswerCorrect(AnswerDAO userAnswer) {
        Set<AnswerDAO> answers = answerDB.getCorrectAnswers();
        for (AnswerDAO answer : answers) {
            if (answer.equals(userAnswer)) {
                System.out.println("Good answer!");
                return true;
            }
        }
        System.out.println("nope");
        return false;
    }
}

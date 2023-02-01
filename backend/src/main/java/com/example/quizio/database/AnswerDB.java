package com.example.quizio.database;

import com.example.quizio.controller.dao.AnswerDAO;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Set;

@Repository
public class AnswerDB {

    Set<AnswerDAO> correctAnswers;

    public AnswerDB() {
        correctAnswers = new HashSet<>();
    }

    public Set<AnswerDAO> getCorrectAnswers() {
        return correctAnswers;
    }

    public void addToAnswerDB(AnswerDAO answer) {
        correctAnswers.add(answer);
    }
}

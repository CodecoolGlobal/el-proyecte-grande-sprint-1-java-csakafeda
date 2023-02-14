package com.example.quizio.database;

import com.example.quizio.controller.dto.Answer;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Set;

@Repository
public class AnswerDB {

    Set<Answer> correctAnswers;

    public AnswerDB() {
        correctAnswers = new HashSet<>();
    }

    public Set<Answer> getCorrectAnswers() {
        return correctAnswers;
    }

    public void addToAnswerDB(Answer answer) {
        correctAnswers.add(answer);
    }
}

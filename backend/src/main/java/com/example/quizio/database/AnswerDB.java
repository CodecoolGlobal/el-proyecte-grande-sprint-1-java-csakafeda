package com.example.quizio.database;

import com.example.quizio.controller.dto.AnswerDTO;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Set;

@Repository
public class AnswerDB {

    Set<AnswerDTO> correctAnswers;

    public AnswerDB() {
        correctAnswers = new HashSet<>();
    }

    public Set<AnswerDTO> getCorrectAnswers() {
        return correctAnswers;
    }

    public void addToAnswerDB(AnswerDTO answer) {
        correctAnswers.add(answer);
    }
}

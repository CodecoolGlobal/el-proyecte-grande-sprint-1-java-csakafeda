package com.example.quizio.service;

import com.example.quizio.database.repository.Answer;
import com.example.quizio.database.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;

    @Autowired
    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public int correctAnswerProvider(Answer userAnswer) {
        String userAnswerId = userAnswer.getQuestionId();
        return answerRepository.findAll()
                .stream().filter(answerDTO -> answerDTO.getQuestionId()
                        .equals(userAnswerId)).findFirst().orElseThrow().getAnswerIndex();
    }
}

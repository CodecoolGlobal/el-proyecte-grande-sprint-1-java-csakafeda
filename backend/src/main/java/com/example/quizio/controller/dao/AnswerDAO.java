package com.example.quizio.controller.dao;

import java.util.Objects;

public record AnswerDAO(String questionId,
                        Integer answerIndex) {

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AnswerDAO answerDAO = (AnswerDAO) o;
        return Objects.equals(questionId, answerDAO.questionId) && Objects.equals(answerIndex, answerDAO.answerIndex);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}

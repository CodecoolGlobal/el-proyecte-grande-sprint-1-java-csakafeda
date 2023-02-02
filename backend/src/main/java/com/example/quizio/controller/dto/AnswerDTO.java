package com.example.quizio.controller.dto;

import java.util.Objects;

public record AnswerDTO(String questionId,
                        Integer answerIndex) {

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AnswerDTO answerDAO = (AnswerDTO) o;
        return Objects.equals(questionId, answerDAO.questionId) && Objects.equals(answerIndex, answerDAO.answerIndex);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}

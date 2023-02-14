package com.example.quizio.controller.dto;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer {

    @Id
    private String questionId;
    private Integer answerIndex;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Answer answerDAO = (Answer) o;
        return Objects.equals(questionId, answerDAO.questionId) && Objects.equals(answerIndex, answerDAO.answerIndex);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}

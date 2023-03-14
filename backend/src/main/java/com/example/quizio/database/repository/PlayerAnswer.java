package com.example.quizio.database.repository;

import lombok.*;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayerAnswer {

    @Id
    private String questionId;
    private Integer answerIndex;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass())
            return false;
        PlayerAnswer playerAnswerDAO = (PlayerAnswer) o;
        return Objects.equals(questionId, playerAnswerDAO.questionId) && Objects.equals(answerIndex, playerAnswerDAO.answerIndex);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}

package com.example.quizio.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Answer {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
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

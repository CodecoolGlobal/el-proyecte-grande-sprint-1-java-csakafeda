package com.example.quizio.database.repository;

import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Id
    private String id;
    @Column(length = 500)
    private String question;
    @Column(length = 500)
    private String correctAnswer;
    @Column(length = 500)
    private String incorrectAnswer1;
    @Column(length = 500)
    private String incorrectAnswer2;
    @Column(length = 500)
    private String incorrectAnswer3;
    private Category category;
    private Difficulty difficulty;
}
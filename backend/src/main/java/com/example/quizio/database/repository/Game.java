package com.example.quizio.database.repository;

import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    @JsonIgnore
    private Player creator;
    private LocalDateTime createdDateTime;
    @ElementCollection
    private Set<Category> categories;
    private Difficulty difficulty;
    @ManyToMany
    @JoinTable(
            name = "game_questions",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    private List<Question> questions;
    @OneToMany(mappedBy = "game")
    private Set<Score> players;
}
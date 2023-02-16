package com.example.quizio.database.repository;

import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import lombok.*;

import javax.persistence.*;
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
    private Player creator;
    @ElementCollection
    private Set<Category> categories;
    private Difficulty difficulty;
    @OneToMany
    private List<Question> questions;
    @OneToMany(mappedBy = "game")
    private Set<PlayerGame> players;
}
package com.example.quizio.database.repository;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    private Player creator;
    private String category;
    private String difficulty;
    @OneToMany
    private List<Question> questions;
    @OneToMany(mappedBy = "game")
    private Set<PlayerGame> players;
}
package com.example.quizio.database.repository;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String email;
    private String password;
    @OneToMany(mappedBy = "player")
    private Set<PlayerGame> playedGames;
    @OneToMany(mappedBy = "creator")
    private Set<Game> createdGames;
}
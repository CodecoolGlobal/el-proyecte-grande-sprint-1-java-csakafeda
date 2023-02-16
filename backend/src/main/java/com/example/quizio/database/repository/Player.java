package com.example.quizio.database.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
package com.example.quizio.database.repository;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String email;
    private String password;
    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
    private Set<Score> playedGames;
    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
    private Set<Game> createdGames;
}
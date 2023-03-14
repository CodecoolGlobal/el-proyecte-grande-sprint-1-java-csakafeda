package com.example.quizio.database.repository;

import com.example.quizio.database.enums.Role;
import jakarta.persistence.*;
import lombok.*;


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
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "player")
    private Set<Score> playedGames;
    @OneToMany(mappedBy = "creator")
    private Set<Game> createdGames;
}
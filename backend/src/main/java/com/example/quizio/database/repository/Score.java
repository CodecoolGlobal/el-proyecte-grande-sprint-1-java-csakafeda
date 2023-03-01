package com.example.quizio.database.repository;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Integer score;
    @JsonIgnore
    @ManyToOne
    private Player player;
    @JsonIgnore
    @ManyToOne
    private Game game;
}
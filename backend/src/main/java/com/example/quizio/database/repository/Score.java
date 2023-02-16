package com.example.quizio.database.repository;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Score {
    @EmbeddedId
    private PlayerGameId playerGameId;
    private Integer score;
    @MapsId("playerId")
    @ManyToOne
    private Player player;
    @MapsId("gameId")
    @ManyToOne
    private Game game;
}
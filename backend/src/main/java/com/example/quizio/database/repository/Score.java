package com.example.quizio.database.repository;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
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
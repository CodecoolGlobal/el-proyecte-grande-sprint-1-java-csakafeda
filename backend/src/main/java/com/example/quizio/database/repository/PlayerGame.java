package com.example.quizio.database.repository;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class PlayerGame {
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
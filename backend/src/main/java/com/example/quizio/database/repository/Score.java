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
    @ManyToOne(cascade = CascadeType.ALL)
    private Player player;
    @MapsId("gameId")
    @ManyToOne(cascade = CascadeType.ALL)
    private Game game;
}
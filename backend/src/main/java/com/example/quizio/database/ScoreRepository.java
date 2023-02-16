package com.example.quizio.database;

import com.example.quizio.database.repository.PlayerGame;
import com.example.quizio.database.repository.PlayerGameId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<PlayerGame, PlayerGameId> {
}

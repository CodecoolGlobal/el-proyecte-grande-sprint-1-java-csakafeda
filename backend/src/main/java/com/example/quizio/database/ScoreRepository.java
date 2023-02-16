package com.example.quizio.database;

import com.example.quizio.database.repository.Score;
import com.example.quizio.database.repository.PlayerGameId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<Score, PlayerGameId> {
}

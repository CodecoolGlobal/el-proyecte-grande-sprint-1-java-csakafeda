package com.example.quizio.database;

import com.example.quizio.database.repository.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> searchScoreByGame_Id(Long gameId);
}

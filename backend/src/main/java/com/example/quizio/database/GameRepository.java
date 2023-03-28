package com.example.quizio.database;

import com.example.quizio.database.repository.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}

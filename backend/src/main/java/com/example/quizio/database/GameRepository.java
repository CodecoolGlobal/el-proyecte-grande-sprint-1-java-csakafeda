package com.example.quizio.database;

import com.example.quizio.database.repository.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findAll();

}

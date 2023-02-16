package com.example.quizio.database;

import com.example.quizio.database.repository.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface GameRepository extends JpaRepository<Game, Long> {

    Set<Game> findAllByCreatorId(Long id);

    Set<Game> findAllByCreatorName(String name);

    Set<Game> findAllByCreatorEmail(String email);

}

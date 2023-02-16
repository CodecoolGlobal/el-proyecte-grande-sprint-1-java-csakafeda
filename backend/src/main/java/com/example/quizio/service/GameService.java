package com.example.quizio.service;

import com.example.quizio.database.GameRepository;
import com.example.quizio.database.PlayerRepository;
import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GameService {
    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public GameService(GameRepository gameRepository, PlayerRepository playerRepository) {
        this.gameRepository = gameRepository;
        this.playerRepository = playerRepository;
    }

    public Long generateNewMultiGameAndReturnGameId(
            Optional<Difficulty> difficulty,
            Optional<Category> category,
            Optional<Long> createdBy
    ) {
        return null;
    }
}

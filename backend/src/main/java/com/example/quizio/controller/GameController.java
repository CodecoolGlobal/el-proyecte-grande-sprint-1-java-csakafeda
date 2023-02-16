package com.example.quizio.controller;

import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import com.example.quizio.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class GameController {
    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("newgame")
    public Long createNewMultiGame(
            @RequestParam Optional<Difficulty> difficulty,
            @RequestParam Optional<Category> category,
            @RequestParam Optional<Long> createdBy
    ) {
        return gameService.generateNewMultiGameAndReturnGameId(difficulty, category, createdBy);
    }
}

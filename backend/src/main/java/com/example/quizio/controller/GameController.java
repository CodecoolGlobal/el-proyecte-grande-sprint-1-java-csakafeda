package com.example.quizio.controller;

import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import com.example.quizio.database.repository.Game;
import com.example.quizio.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
public class GameController {
    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/newgame")
    public Long createNewMultiGame(
            @RequestParam Long createdBy,
            @RequestParam Optional<Difficulty> difficulty,
            @RequestParam Optional<Category[]> categories
    ) {
        return gameService.generateNewMultiGameAndReturnGameId(createdBy, difficulty, categories);
    }

    @PostMapping("/playedgame")
    public void storePlayedGame(
            @RequestParam Long gameId,
            @RequestParam Long playerId,
            @RequestParam Integer score) {
        gameService.saveGameScore(gameId, playerId, score);
    }

    @GetMapping("/loadgame")
    public Set<Game> loadCreatedGames(
            @RequestParam(required = false) Long playerId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email
    ) {
        return gameService.loadGameByPlayerNameOrIdOrEmail(playerId, name, email);
    }
}

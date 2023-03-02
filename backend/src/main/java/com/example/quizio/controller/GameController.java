package com.example.quizio.controller;

import com.example.quizio.controller.dto.GameScoreDTO;
import com.example.quizio.controller.dto.GameSearchDTO;
import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import com.example.quizio.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
    public Set<GameSearchDTO> loadCreatedGames(
            @RequestParam(required = false) Long gameId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Difficulty difficulty,
            @RequestParam(required = false) Set<Category> categories
    ) {
        return gameService.loadGamesByParams(gameId, name, difficulty, categories).stream()
                .map(game -> new GameSearchDTO(
                        game.getId(),
                        game.getCreator().getName(),
                        game.getCreator().getId(),
                        game.getDifficulty(),
                        game.getCategories(),
                        game.getPlayers().stream()
                                .map(scoreEntity -> new GameScoreDTO(
                                        scoreEntity.getScore(),
                                        scoreEntity.getPlayer().getName(),
                                        scoreEntity.getPlayer().getId(),
                                        scoreEntity.getPlayedDateTime()
                                        ))
                                .collect(Collectors.toList()),
                        game.getCreatedDateTime()
                ))
                .collect(Collectors.toSet());
    }
}

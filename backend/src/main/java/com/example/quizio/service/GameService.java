package com.example.quizio.service;

import com.example.quizio.controller.exception.BadRequestException;
import com.example.quizio.database.GameRepository;
import com.example.quizio.database.PlayerRepository;
import com.example.quizio.database.ScoreRepository;
import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import com.example.quizio.database.repository.Game;
import com.example.quizio.database.repository.Player;
import com.example.quizio.database.repository.Question;
import com.example.quizio.database.repository.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class GameService {
    private static final int QUESTION_LENGTH = 10;
    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;
    private final QuestionService questionService;
    private final ScoreRepository scoreRepository;

    @Autowired
    public GameService(GameRepository gameRepository,
                       PlayerRepository playerRepository,
                       QuestionService questionService,
                       ScoreRepository scoreRepository) {
        this.gameRepository = gameRepository;
        this.playerRepository = playerRepository;
        this.questionService = questionService;
        this.scoreRepository = scoreRepository;
    }

    public Long generateNewMultiGameAndReturnGameId(
            Long createdBy,
            Optional<Difficulty> difficulty,
            Optional<Category[]> categories
    ) {
        Question[] questions = questionService.getMultipleQuestions(QUESTION_LENGTH, difficulty, categories);
        Game.GameBuilder gameBuilder = Game.builder()
                .questions(List.of(questions))
                .creator(playerRepository.getById(createdBy))
                .createdDateTime(LocalDateTime.now());
        difficulty.ifPresent(gameBuilder::difficulty);
        categories.ifPresent(value -> gameBuilder.categories(Set.of(value)));
        Game game = gameBuilder.build();
        gameRepository.save(game);
        return game.getId();
    }

    public void saveGameScore(Long gameId, Long playerId, Integer score) {
        Optional<Game> game = gameRepository.findById(gameId);
        Optional<Player> player = playerRepository.findById(playerId);
        if (game.isEmpty() || player.isEmpty()) {
            throw new BadRequestException("Game or player doesn't exist.");
        }
        scoreRepository.save(Score.builder().game(game.get()).player(player.get()).score(score).playedDateTime(LocalDateTime.now()).build());
    }

    public Set<Game> loadGamesByParams(
            Long playerId,
            String playerName,
            Difficulty difficulty,
            Set<Category> categories
    ) {
        Stream<Game> gameStream = gameRepository.findAll().stream();
        if (playerId != null) gameStream = gameStream.filter(game -> game.getCreator().getId().equals(playerId));
        if (playerName != null) gameStream = gameStream.filter(game -> game.getCreator().getName().equals(playerName));
        if (difficulty != null) gameStream = gameStream.filter(game -> game.getDifficulty().equals(difficulty));
        if (categories != null) {
            for (Category category : categories) {
                gameStream = gameStream.filter(game -> game.getCategories().contains(category));
            }
        }
        return gameStream.collect(Collectors.toSet());
    }

    public Integer getHighScoreByGameId(Long gameId) {
        Optional<Integer> highScore = scoreRepository.searchScoreByGame_Id(gameId).stream().map(Score::getScore).max(Integer::compare);
        if (highScore.isEmpty()) return null;
        return highScore.get();
    }
}

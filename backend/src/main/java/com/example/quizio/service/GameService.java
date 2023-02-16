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

import java.util.List;
import java.util.Optional;
import java.util.Set;

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
        Game.GameBuilder gameBuilder = Game.builder().questions(List.of(questions)).creator(playerRepository.getById(createdBy));
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
        scoreRepository.save(Score.builder().game(game.get()).player(player.get()).score(score).build());
    }

    public Set<Game> loadGameByPlayerNameOrIdOrEmail(
            Long playerId,
            String playerName,
            String playerEmail) {
        if (playerId == null && playerName.isEmpty() && playerEmail.isEmpty()) {
            throw new BadRequestException(
                    "Player id & name & email doesn't provided, you must provide one not empty field to get a game!"
            );
        }

        if (playerId != null && playerRepository.existsById(playerId)) {
            return gameRepository.findAllByCreatorId(playerId);
        } else if (playerRepository.existsByName(playerName)) {
            return gameRepository.findAllByCreatorName(playerName);
        } else if (playerRepository.existsByEmail(playerEmail)) {
            return gameRepository.findAllByCreatorEmail(playerEmail);
        }
        throw new BadRequestException("None provided field exists in database.");
    }
}

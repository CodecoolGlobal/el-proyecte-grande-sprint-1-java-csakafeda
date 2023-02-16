package com.example.quizio.service;

import com.example.quizio.database.GameRepository;
import com.example.quizio.database.PlayerRepository;
import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import com.example.quizio.database.repository.Game;
import com.example.quizio.database.repository.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class GameService {
    private final int QUESTION_LENGTH = 10;
    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;
    private final QuestionService questionService;

    @Autowired
    public GameService(GameRepository gameRepository, PlayerRepository playerRepository, QuestionService questionService) {
        this.gameRepository = gameRepository;
        this.playerRepository = playerRepository;
        this.questionService = questionService;
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
}

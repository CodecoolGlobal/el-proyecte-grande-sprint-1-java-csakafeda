package com.example.quizio.controller;

import com.example.quizio.controller.dto.QuestionDTO;
import com.example.quizio.controller.exception.BadRequestException;
import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import com.example.quizio.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
public class QuestionController {
    private final QuestionDTO DUMMY_QUESTION = new QuestionDTO("Science", "63adbd6404c68cc1e14b8e2a", new String[]{"df", "df", "sv", "sfd"}, "What type of tree is known for its 'weeping' shape?)");

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("question")
    public QuestionDTO getQuestion(
            @RequestParam Optional<Difficulty> difficulty,
            @RequestParam Optional<Category> category,
            @RequestParam Optional<Long> gameId,
            @RequestParam Optional<Integer> index
    ) {
        if ((gameId.isPresent() && index.isEmpty()) || (gameId.isEmpty() && index.isPresent())) {
            throw new BadRequestException("Can't provide only gameId or index. If you provide one, you have to provide the other as well.");
        }
        if (gameId.isPresent()) {
            QuestionDTO currentQuestion = questionService.getQuestionOnGameIndex(gameId.get(), index.get());
            if (currentQuestion == null) {
                throw new BadRequestException("No game on this id.");
            }
            return currentQuestion;
        }
        return questionService.getSingleQuestionDTO(difficulty, category);
    }

}

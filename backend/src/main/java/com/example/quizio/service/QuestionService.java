package com.example.quizio.service;

import com.example.quizio.controller.dao.TriviaApiDAO;
import com.example.quizio.controller.dto.QuestionDTO;
import com.example.quizio.database.AnswerRepository;
import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import com.example.quizio.database.repository.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class QuestionService {
    private static final int LIMIT_NUMBER = 1;
    private static final String URL = "https://the-trivia-api.com/api/questions";
    private final RestTemplate restTemplate = new RestTemplate();
    private final AnswerRepository answerRepository;

    @Autowired
    public QuestionService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public QuestionDTO getSingleQuestion(Optional<Difficulty> difficulty, Optional<Category> category) {
        TriviaApiDAO questionFromApi = getQuestionsFromTriviaApi(LIMIT_NUMBER, difficulty, category)[0];
        return provideQuestionWithAllAnswers(questionFromApi);
    }

    public QuestionDTO provideQuestionWithAllAnswers(TriviaApiDAO questionFromApi) {

        List<String> answers = new ArrayList<>();
        Collections.addAll(answers, questionFromApi.incorrectAnswers());

        Random random = new Random();
        int randomIndex = random.nextInt(3);
        answers.add(randomIndex, questionFromApi.correctAnswer());

        Answer answer = Answer.builder()
                .questionId(questionFromApi.id())
                .answerIndex(randomIndex)
                .build();
        answerRepository.save(answer);
        return new QuestionDTO(
                questionFromApi.category(),
                questionFromApi.id(), answers.toArray(
                answers.toArray(new String[4])),
                questionFromApi.question());
    }

    private TriviaApiDAO[] getQuestionsFromTriviaApi(int limit, Optional<Difficulty> difficulty, Optional<Category> category) {

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("?limit=").append(limit);
        difficulty.ifPresent(value -> stringBuilder.append("&difficulty=").append(value.stringValue));
        category.ifPresent(value -> stringBuilder.append("&categories=").append(value.stringValue));

        TriviaApiDAO[] questions = restTemplate.getForObject(URL + stringBuilder, TriviaApiDAO[].class);
        if (questions == null || questions.length != limit) {
            throw new IllegalStateException();
        } else {
            return questions;
        }
    }
}

package com.example.quizio.service;

import com.example.quizio.database.QuestionRepository;
import com.example.quizio.database.repository.PlayerAnswer;
import com.example.quizio.controller.dto.QuestionDTO;
import com.example.quizio.controller.dao.TriviaApiDAO;
import com.example.quizio.database.AnswerRepository;
import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;
import com.example.quizio.database.repository.Question;
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
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(AnswerRepository answerRepository, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }



    public QuestionDTO getSingleQuestionDTO(Optional<Difficulty> difficulty, Optional<Category[]> categories) {
        TriviaApiDAO questionFromApi = getQuestionsFromTriviaApi(LIMIT_NUMBER, difficulty, categories)[0];
        return provideQuestionWithAllAnswers(questionFromApi);
    }

    public Question[] getMultipleQuestions(int length, Optional<Difficulty> difficulty, Optional<Category[]> categories) {
        TriviaApiDAO[] questionsFromApi = getQuestionsFromTriviaApi(length, difficulty, categories);
        return Arrays.stream(questionsFromApi)
                .map(questionDTO -> {
                            if (questionRepository.existsById(questionDTO.id())) return questionRepository.getById(questionDTO.id());
                            Question question = Question.builder()
                                    .question(questionDTO.question())
                                    .id(questionDTO.id())
                                    .incorrectAnswer1(questionDTO.incorrectAnswers()[0])
                                    .incorrectAnswer2(questionDTO.incorrectAnswers()[1])
                                    .incorrectAnswer3(questionDTO.incorrectAnswers()[2])
                                    .correctAnswer(questionDTO.correctAnswer())
                                    .category(Category.valueOf(questionDTO.category().replace(" ", "_").replace("&", "AND").toUpperCase()))
                                    .difficulty(Difficulty.valueOf(questionDTO.difficulty().replace(" ", "_").replace("&", "AND").toUpperCase()))
                                    .build();
                                questionRepository.save(question);
                                return question;
                        }
                )
                .toArray(Question[]::new);
    }

    public QuestionDTO provideQuestionWithAllAnswers(TriviaApiDAO questionFromApi) {

        List<String> answers = new ArrayList<>();
        Collections.addAll(answers, questionFromApi.incorrectAnswers());

        Random random = new Random();
        int randomIndex = random.nextInt(3);
        answers.add(randomIndex, questionFromApi.correctAnswer());

        PlayerAnswer playerAnswer = PlayerAnswer.builder()
                .questionId(questionFromApi.id())
                .answerIndex(randomIndex)
                .build();
        answerRepository.save(playerAnswer);
        return new QuestionDTO(
                questionFromApi.category(),
                questionFromApi.id(), answers.toArray(
                answers.toArray(new String[4])),
                questionFromApi.question());
    }

    private TriviaApiDAO[] getQuestionsFromTriviaApi(int limit, Optional<Difficulty> difficulty, Optional<Category[]> categories) {

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("?limit=").append(limit);
        difficulty.ifPresent(value -> stringBuilder.append("&difficulty=").append(value.stringValue));
        categories.ifPresent(value -> {
            stringBuilder.append("&categories=");
            String[] categoriesAsString = Arrays.stream(value).map(value1 -> value1.stringValue).toArray(String[]::new);
            stringBuilder.append(String.join(",", categoriesAsString));
        });
        System.out.println("Getting " + URL + stringBuilder);

        TriviaApiDAO[] questions = restTemplate.getForObject(URL + stringBuilder, TriviaApiDAO[].class);
        if (questions == null || questions.length != limit) {
            throw new IllegalStateException();
        } else {
            return questions;
        }
    }
}

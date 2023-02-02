package com.example.quizio.controller.dao;

public record TriviaApiDAO(String category, String id,
                           String correctAnswer,
                           String[] incorrectAnswers,
                           String question, String[] tags,
                           String type, String difficulty,
                           String[] regions,
                           String isNiche) {
}

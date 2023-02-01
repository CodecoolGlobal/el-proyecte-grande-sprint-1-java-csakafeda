package com.example.quizio.controller.dao;

public record QuestionDAO(String category,
                          String id,
                          String[] answers,
                          String question,
                          String difficulty) {
}

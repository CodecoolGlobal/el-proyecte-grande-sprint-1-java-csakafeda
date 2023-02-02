package com.example.quizio.controller.dto;

public record QuestionDTO(String category,
                          String id,
                          String[] answers,
                          String question) {
}

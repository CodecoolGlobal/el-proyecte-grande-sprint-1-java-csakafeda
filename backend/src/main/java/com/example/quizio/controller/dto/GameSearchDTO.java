package com.example.quizio.controller.dto;

import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;

import java.util.Set;

public record GameSearchDTO(
        Long id,
        Difficulty difficulty,
        Set<Category> categories,
        Integer highscore
) {
}

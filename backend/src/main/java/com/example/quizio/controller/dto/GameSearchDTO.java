package com.example.quizio.controller.dto;

import com.example.quizio.database.enums.Category;
import com.example.quizio.database.enums.Difficulty;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public record GameSearchDTO(
        Long id,
        String createdByName,
        Long createdById,
        Difficulty difficulty,
        Set<Category> categories,
        List<GameScoreDTO> scores,
        LocalDateTime createdDateTime
) {
}

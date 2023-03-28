package com.example.quizio.controller.dto;

import java.time.LocalDateTime;

public record GameScoreDTO(Integer score, String playerName, Long playerId, LocalDateTime playedDateTime) {
}

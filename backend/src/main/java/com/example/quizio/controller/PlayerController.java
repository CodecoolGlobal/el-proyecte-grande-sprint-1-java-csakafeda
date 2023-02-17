package com.example.quizio.controller;

import com.example.quizio.database.repository.Player;
import com.example.quizio.service.PlayerService;
import org.springframework.web.bind.annotation.*;

@RestController
public class PlayerController {
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping("/player")
    public Player saveNewPlayer(@RequestBody Player player) {
        return playerService.createPlayer(player);
    }

    @PatchMapping("/player-id")
    public Long getPlayerIdFromPlayerEntity(@RequestBody Player player) {
        return playerService.getIdFromPlayer(player);
    }
}

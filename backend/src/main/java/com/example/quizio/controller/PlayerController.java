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

    @PatchMapping("/player-id-and-name")
    public Player getPlayerIdAndNameFromPlayerEntity(@RequestBody Player player) {
        return playerService.getIdAndNameFromPlayer(player);
    }

    @GetMapping("/player")
    public Player getPlayerByIdOrNameOrEmail(
            @RequestParam(required = false) Long playerId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email) {
        return playerService.loadPlayerByPlayerNameOrIdOrEmail(playerId, name, email);
    }
}

package com.example.quizio.controller;

import com.example.quizio.controller.dto.PlayerDTO;
import com.example.quizio.database.enums.Role;
import com.example.quizio.database.repository.Player;
import com.example.quizio.service.PlayerService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class PlayerController {
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping("/player")
    public Player saveNewPlayer(@RequestBody PlayerDTO player) {
        Player newPlayer = Player.builder()
                .name(player.getName())
                .email(player.getEmail())
                .password(player.getPassword())
                .role(Role.ROLE_PLAYER)
                .build();
        return playerService.createPlayer(newPlayer);
    }

    @PostMapping("/player/login")
    public HttpStatus login() {
        return HttpStatus.ACCEPTED;
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

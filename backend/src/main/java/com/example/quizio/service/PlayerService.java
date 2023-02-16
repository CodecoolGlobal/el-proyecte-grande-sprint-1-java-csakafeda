package com.example.quizio.service;

import com.example.quizio.database.PlayerRepository;
import com.example.quizio.database.repository.Player;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }
}

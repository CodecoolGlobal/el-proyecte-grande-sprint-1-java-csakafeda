package com.example.quizio.service;

import com.example.quizio.controller.exception.BadRequestException;
import com.example.quizio.controller.exception.PasswordDoesNotMatchException;
import com.example.quizio.controller.exception.UsernameNotFoundException;
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

    public Long getIdFromPlayer(Player player) {

        if (!playerRepository.existsByName(player.getName())) {
            throw new UsernameNotFoundException("Username " + player.getName() + "was not found in database.");
        }

        Player fullPlayerEntity = playerRepository.getPlayerByName(player.getName());

        if (!player.getPassword().equals(fullPlayerEntity.getPassword())) {
            throw new PasswordDoesNotMatchException("Provided passwords do not match.");
        }

        return fullPlayerEntity.getId();
    }

    public Player loadPlayerByPlayerNameOrIdOrEmail(Long playerId, String name, String email) {
        if (playerId == null && name == null && email == null) {
            throw new BadRequestException(
                    "Player id & name & email doesn't provided, you must provide one not empty field to get a player!"
            );
        }

        if (playerId != null && playerRepository.existsById(playerId)) {
            return playerRepository.getPlayerById(playerId);
        } else if (playerRepository.existsByName(name)) {
            return playerRepository.getPlayerByName(name);
        } else if (playerRepository.existsByEmail(email)) {
            return playerRepository.getPlayerByEmail(email);
        }
        throw new BadRequestException("None provided field exists in database.");
    }
}

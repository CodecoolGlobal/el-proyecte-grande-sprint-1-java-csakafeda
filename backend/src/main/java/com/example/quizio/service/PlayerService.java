package com.example.quizio.service;

import com.example.quizio.controller.exception.PasswordDoesNotMatchException;
import com.example.quizio.controller.exception.UsernameNotFoundException;
import com.example.quizio.database.PlayerRepository;
import com.example.quizio.database.repository.Player;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerService implements UserDetailsService {
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

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Player player = playerRepository.getPlayerByName(name);
        if (player == null) {
            throw new UsernameNotFoundException(name);
        }
        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        return null;
        //TODO role-management and return new user
    }
}

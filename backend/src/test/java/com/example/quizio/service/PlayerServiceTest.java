package com.example.quizio.service;

import com.example.quizio.controller.dto.UsernameAndPasswordDTO;
import com.example.quizio.controller.exception.PasswordDoesNotMatchException;
import com.example.quizio.controller.exception.UsernameNotFoundException;
import com.example.quizio.database.PlayerRepository;
import com.example.quizio.database.repository.Player;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.EntityExistsException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PlayerServiceTest {
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private PlayerRepository playerRepository;
    @InjectMocks
    private PlayerService playerService;

    //createPlayer method tests
    @Test
    void createPlayer_Successful() {
        Player testPlayer = new Player();
        testPlayer.setName("John");
        testPlayer.setEmail("john@test.com");
        testPlayer.setPassword("123");

        when(playerRepository.save(any())).thenReturn(testPlayer);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        Player createdPlayer = playerService.createPlayer(testPlayer);

        assertEquals(testPlayer, createdPlayer);
        assertEquals("encodedPassword", createdPlayer.getPassword());
    }

    @Test
    void createPlayer_unSuccessful_usernameAlreadyExists() {
        Player testPlayer = new Player();
        testPlayer.setName("Mari");
        testPlayer.setEmail("mari@test.com");
        testPlayer.setPassword("asd");

        when(playerRepository.existsByName(anyString())).thenReturn(true);

        assertThrows(EntityExistsException.class,
                () -> playerService.createPlayer(testPlayer));
    }

    @Test
    void createPlayer_unSuccessful_emailAlreadyRegistered() {
        Player testPlayer = new Player();
        testPlayer.setName("Mari2");
        testPlayer.setEmail("mari2@test.com");
        testPlayer.setPassword("asd");

        when(playerRepository.existsByEmail(anyString())).thenReturn(true);

        assertThrows(EntityExistsException.class,
                () -> playerService.createPlayer(testPlayer));
    }


    //getIdAndNameFromPlayer method tests

    @Test
    void getIdAndNameFromPlayer_Successfully() {
        UsernameAndPasswordDTO dto = new UsernameAndPasswordDTO();
        dto.setName("someone");
        dto.setPassword("qwert");

        Player player = new Player();
        player.setName("someone");
        player.setEmail("123@asd.com");
        player.setPassword("encodedPassword");

        when(playerRepository.existsByName(anyString())).thenReturn(true);
        when(playerRepository.getPlayerByName(anyString())).thenReturn(player);
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        Player retrievedPlayer = playerService.getIdAndNameFromPlayer(dto);

        assertEquals(player, retrievedPlayer);
    }

    @Test
    void getIdAndNameFromPlayer_unSuccessful_WithInvalidUsername() {
        String testName = "Nani";
        String testPassword = "123";
        when(playerRepository.existsByName(testName)).thenReturn(false);

        assertThrows(UsernameNotFoundException.class, () -> playerService.getIdAndNameFromPlayer(new UsernameAndPasswordDTO(testName, testPassword)));
    }

    @Test
    void getIdAndNameFromPlayer_unSuccessful_invalidPassword() {
        String name = "Soltész Rezső";
        String password = "123";
        Player player = new Player();
        player.setName(name);
        player.setPassword("encoded_password");

        UsernameAndPasswordDTO dto = new UsernameAndPasswordDTO(name, password);

        when(playerRepository.existsByName(name)).thenReturn(true);
        when(playerRepository.getPlayerByName(name)).thenReturn(player);

        assertThrows(PasswordDoesNotMatchException.class, () -> playerService.getIdAndNameFromPlayer(dto));
    }

    @Test
    void getPlayerByName() {
    }

    @Test
    void loadUserByUsername() {
    }

    @Test
    void loadPlayerByPlayerNameOrIdOrEmail() {
    }
}
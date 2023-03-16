package com.example.quizio.service;

import com.example.quizio.controller.dto.UsernameAndPasswordDTO;
import com.example.quizio.controller.exception.BadRequestException;
import com.example.quizio.controller.exception.PasswordDoesNotMatchException;
import com.example.quizio.controller.exception.UsernameNotFoundException;
import com.example.quizio.database.PlayerRepository;
import com.example.quizio.database.repository.Player;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.EntityExistsException;
import java.util.List;

import static com.example.quizio.database.enums.Role.ROLE_PLAYER;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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


    // getPlayerByName method test


    @Test
    void getPlayerByName() {
        String testPlayer = "Dávid";
        Player expectedPlayer = new Player();
        expectedPlayer.setName(testPlayer);

        when(playerRepository.findByName(testPlayer)).thenReturn(expectedPlayer);

        Player actualPlayer = playerService.getPlayerByName(testPlayer);

        assertEquals(expectedPlayer, actualPlayer);
    }

    //loadUserByUsername method tests

    @Test
    void loadUserByUsernameWithValidUsername_successful() {
        String name = "Johnyka";
        String password = "123";
        Player player = new Player();

        player.setName(name);
        player.setPassword(password);
        player.setRole(ROLE_PLAYER);

        when(playerRepository.getPlayerByName(name)).thenReturn(player);

        List<SimpleGrantedAuthority> roles = List.of(new SimpleGrantedAuthority(player.getRole().name()));
        User expectedUser = new User(name, password, roles);
        User actualUser = (User) playerService.loadUserByUsername(name);
        assertEquals(expectedUser.getUsername(), actualUser.getUsername());
        assertEquals(expectedUser.getPassword(), actualUser.getPassword());
        assertEquals(expectedUser.getAuthorities(), actualUser.getAuthorities());
    }

    @Test
    void loadUserByUsername_unSuccessful_invalidUsername() {
        String name = "kicsicsíra";
        when(playerRepository.getPlayerByName(anyString())).thenReturn(null);

        UsernameNotFoundException exception = Assertions.assertThrows(UsernameNotFoundException.class, () -> playerService.loadUserByUsername(name));

        assertEquals(name, exception.getMessage());
    }

    // loadPlayerByPlayerNameOrIdOrEmail  method tests

    @Test
    void loadPlayerByPlayerNameOrIdOrEmail_successful_justPlayerId() {
        Long playerId = 1L;
        String name = null;
        String email = null;

        Player player = new Player();
        player.setId(playerId);

        when(playerRepository.existsById(playerId)).thenReturn(true);
        when(playerRepository.getPlayerById(playerId)).thenReturn(player);

        Player result = playerService.loadPlayerByPlayerNameOrIdOrEmail(playerId, name, email);

        assertEquals(player, result);
    }

    @Test
    void loadPlayerByPlayerNameOrIdOrEmail_successful_justPlayerName() {
        Long playerId = null;
        String name = "jani";
        String email = null;

        Player player = new Player();
        player.setName(name);

        when(playerRepository.existsByName(name)).thenReturn(true);
        when(playerRepository.getPlayerByName(name)).thenReturn(player);

        Player result = playerService.loadPlayerByPlayerNameOrIdOrEmail(playerId, name, email);

        Assertions.assertEquals(player, result);
    }

    @Test
    void loadPlayerByPlayerNameOrIdOrEmail_successful_justEmail() {
        Long playerId = null;
        String name = null;
        String email = "test@email.com";

        Player player = new Player();
        player.setEmail(email);

        when(playerRepository.existsByEmail(email)).thenReturn(true);
        when(playerRepository.getPlayerByEmail(email)).thenReturn(player);

        Player result = playerService.loadPlayerByPlayerNameOrIdOrEmail(playerId, name, email);

        Assertions.assertEquals(player, result);
    }

    @Test
    void loadPlayerByPlayerNameOrIdOrEmail_unSuccessful_noProvidedFields() {
        assertThrows(BadRequestException.class, () -> playerService.loadPlayerByPlayerNameOrIdOrEmail(null, null, null));
    }

    @Test
    void loadPlayerByPlayerNameOrIdOrEmail_unSuccessful_invalidFields() {
        Long playerId = null;
        String name = "test";
        String email = "test@test.com";

        when(playerRepository.existsByName(name)).thenReturn(false);
        when(playerRepository.existsByEmail(email)).thenReturn(false);

        assertThrows(BadRequestException.class, () -> playerService.loadPlayerByPlayerNameOrIdOrEmail(playerId, name, email));
    }
}
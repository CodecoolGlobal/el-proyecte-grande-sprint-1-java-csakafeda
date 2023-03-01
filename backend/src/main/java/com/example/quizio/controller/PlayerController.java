package com.example.quizio.controller;

import com.example.quizio.database.repository.Player;
import com.example.quizio.service.PlayerService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

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

    @PostMapping("/player/login")
    public String loginPlayer(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String token = "";
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("token")) {
                token = cookie.getValue();
            }
        }
        return token;
        /*Algorithm algorithm = Algorithm.HMAC256("QU1510");
        JWTVerifier jwtVerifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = jwtVerifier.verify(token);
        String username = decodedJWT.getSubject();
        Player player = playerService.getPlayerByName(username);
        return player.getId();*/
    }

    @GetMapping("/player")
    public Player getPlayerByIdOrNameOrEmail(
            @RequestParam(required = false) Long playerId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email) {
        return playerService.loadPlayerByPlayerNameOrIdOrEmail(playerId, name, email);
    }
}

package com.example.quizio.controller;

import com.example.quizio.QuizioApplication;
import com.example.quizio.controller.dto.PlayerDTO;
import com.example.quizio.database.repository.Player;
import com.example.quizio.security.SecurityConfig;
import com.example.quizio.service.PlayerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.persistence.EntityExistsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {QuizioApplication.class, SecurityConfig.class})
@SpringBootTest
class PlayerControllerTest {

    private MockMvc mvc;
    private WebApplicationContext context;
    private PlayerService playerService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public PlayerControllerTest(PlayerService playerService, WebApplicationContext context) {
        this.playerService = playerService;
        this.context = context;
    }

    @BeforeEach
    public void setup() {
        mvc = MockMvcBuilders
            .webAppContextSetup(context)
            .apply(springSecurity())
            .build();
        try{
            Player initialPlayer = Player.builder()
                .name("csakafeda3")
                .email("john@email.com")
                .password("123")
                .build();
            playerService.createPlayer(initialPlayer);
        }
        catch (EntityExistsException e) {}
    }

    @Test
    void saveNewPlayer_isSuccessful() throws Exception {
        PlayerDTO testPlayerDTO = new PlayerDTO("John", "john@email.com", "123");

        ResultActions result = mvc.perform(post("/player")
                .content(objectMapper.writeValueAsString(testPlayerDTO))
                .contentType(MediaType.APPLICATION_JSON));

        result.andExpect(status().isOk());
    }

    @Test
    void getPlayerIdAndNameFromPlayerEntity() throws Exception {
        PlayerDTO testPlayerDTO = new PlayerDTO("csakafeda3", "john@email.com", "123");
        Player testPlayer = playerService.getPlayerByName(testPlayerDTO.getName());

        MockHttpServletResponse response = mvc.perform(get("/player/login")
                        .content(testPlayer.getName())
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn().getResponse();


        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void getPlayerByIdOrNameOrEmail() {
    }
}

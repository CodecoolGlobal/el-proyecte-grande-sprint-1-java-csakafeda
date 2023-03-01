package com.example.quizio.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.quizio.controller.dto.UsernameAndPasswordDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class CustomFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;

    public CustomFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        UsernameAndPasswordDTO authenticationRequest;
        try {
            authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), UsernameAndPasswordDTO.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getName(),
                        authenticationRequest.getPassword());
        Authentication authToken = authenticationManager.authenticate(token);
        if (authToken.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authToken);
            successfulAuthentication(request, response, authToken);
        }
        filterChain.doFilter(request, response);
    }

    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            Authentication authResult) {
        Algorithm algorithm = Algorithm.HMAC256("QU1510");
        List<String> authorityList = authResult.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        String token = JWT.create()
                .withSubject(authResult.getName())
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", authorityList)
                .sign(algorithm);

        //response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token);

        Cookie cookie = new Cookie("token", token);
        cookie.setSecure(true);
        cookie.setHttpOnly(false);

        response.addCookie(cookie);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        //TODO error handling
    }
}

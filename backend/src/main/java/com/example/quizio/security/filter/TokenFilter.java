package com.example.quizio.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.quizio.controller.dto.UsernameAndPasswordDTO;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TokenFilter extends OncePerRequestFilter {
    private final Algorithm algorithm;

    private final AuthenticationManager authenticationManager;

    public TokenFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        this.algorithm = Algorithm.HMAC256("QU1510");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().equals("/player") && request.getMethod().equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }
        Cookie[] cookies = request.getCookies();
        String token = null;
        boolean isToken = false;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("token")) {
                    isToken = true;
                    token = cookie.getValue();
                }
            }
        }
        if (isToken) {
            JWTVerifier jwtVerifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = jwtVerifier.verify(token);
            String username = decodedJWT.getSubject();
            List<String> roles = decodedJWT.getClaim("roles").asList(String.class);
            List<SimpleGrantedAuthority> authorities = roles.stream().map(SimpleGrantedAuthority::new).toList();
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        } else {
            UsernameAndPasswordDTO authenticationRequest;
            try {
                authenticationRequest = new UsernameAndPasswordDTO(
                        request.getParameter("username"),
                        request.getParameter("password"));
                UsernamePasswordAuthenticationToken newToken =
                        new UsernamePasswordAuthenticationToken(
                                authenticationRequest.getName(),
                                authenticationRequest.getPassword());
                Authentication authToken = authenticationManager.authenticate(newToken);
                if (authToken.isAuthenticated()) {
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    successfulAuthentication(request, response, authToken);
                }
                filterChain.doFilter(request, response);
            } catch (IOException e) {
                filterChain.doFilter(request, response);
            }
        }
    }

    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            Authentication authResult) {
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
        cookie.setHttpOnly(false);
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    }
}

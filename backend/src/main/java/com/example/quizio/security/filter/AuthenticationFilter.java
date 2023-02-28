package com.example.quizio.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response)
            throws AuthenticationException {
        String playerName = request.getParameter("name");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(playerName, password);
        return authenticationManager.authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult)
            throws IOException, ServletException {
        User player = (User) authResult.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256("QU1510");
        List<String> authorityList = player.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        String token = JWT.create()
                .withSubject(player.getUsername())
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", authorityList)
                .sign(algorithm);

        Cookie cookie = new Cookie("token", token);
        cookie.setSecure(true);

        response.addCookie(cookie);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(200);

        //TODO error handling
    }
}

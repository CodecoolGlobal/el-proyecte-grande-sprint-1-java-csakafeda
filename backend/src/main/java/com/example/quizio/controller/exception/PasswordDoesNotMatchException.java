package com.example.quizio.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
public class PasswordDoesNotMatchException extends RuntimeException{
    public PasswordDoesNotMatchException(String message) {
        super(message);
    }
}

package com.example.quizio.database;

import com.example.quizio.controller.dto.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerDB extends JpaRepository<Answer, Long> {
}

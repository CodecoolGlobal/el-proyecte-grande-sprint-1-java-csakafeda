package com.example.quizio.database;

import com.example.quizio.database.repository.PlayerAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<PlayerAnswer, String> {
}

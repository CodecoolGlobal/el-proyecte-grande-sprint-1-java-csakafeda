package com.example.quizio.database;

import com.example.quizio.database.repository.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, String> {
}

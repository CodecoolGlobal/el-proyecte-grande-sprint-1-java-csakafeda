package com.example.quizio.database;

import com.example.quizio.controller.dto.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Set;

public interface AnswerDB extends JpaRepository<Answer, Long> {
}

package com.example.quizio.database;

import com.example.quizio.database.repository.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, String> {
}

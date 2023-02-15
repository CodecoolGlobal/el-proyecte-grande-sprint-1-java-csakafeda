package com.example.quizio.database;

import com.example.quizio.database.repository.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}

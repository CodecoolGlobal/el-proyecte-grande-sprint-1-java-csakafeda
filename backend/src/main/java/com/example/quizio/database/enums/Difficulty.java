package com.example.quizio.database.enums;

public enum Difficulty {
    EASY("easy"), MEDIUM("medium"), HARD("hard");

    public final String stringValue;

    Difficulty(String stringValue) {
        this.stringValue = stringValue;
    }
}

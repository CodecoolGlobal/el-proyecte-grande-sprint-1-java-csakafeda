package com.example.quizio.database.enums;

public enum Category {
    ARTS("arts"),
    MOVIES("movies"),
    FOOD_AND_DRINK("food_and_drink"),
    GENERAL_KNOWLEDGE("general_knowledge"),
    GEOGRAPHY("geography"),
    HISTORY("history"),
    MUSIC("music"),
    SCIENCE("science"),
    SOCIETY_AND_CULTURE("society_and_culture"),
    SPORT_AND_LEISURE("sport_and_leisure");

    public final String stringValue;

    Category(String stringValue) {
        this.stringValue = stringValue;
    }
}

package com.example.hotel.model.response;

import lombok.Data;

import java.util.List;

@Data
public class BlogResponse {
    private Long id;

    private String title;

    private String description;

    private String shortDescription;

    private Boolean display;

    private List<String> imageEncodedStringList;

    private String author;
}

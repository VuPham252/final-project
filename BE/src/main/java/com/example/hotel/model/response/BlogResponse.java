package com.example.hotel.model.response;

import lombok.Data;

@Data
public class BlogResponse {
    private Long id;

    private String title;

    private String description;

    private String shortDescription;

    private Boolean display;

    private String imageCode;

    private String author;
}

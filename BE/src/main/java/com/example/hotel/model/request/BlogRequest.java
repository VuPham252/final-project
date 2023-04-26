package com.example.hotel.model.request;

import lombok.Data;

@Data
public class BlogRequest {

    private String title;

    private String description;

    private String shortDescription;

    private Boolean display;

    private String imageCode;

    private String author;
}

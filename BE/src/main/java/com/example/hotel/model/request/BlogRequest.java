package com.example.hotel.model.request;

import lombok.Data;

@Data
public class BlogRequest {

    private String title;

    private String description;

    private String shortDescription;

    @Data
    public static class NewRequest extends BlogRequest {

        private Boolean display;

        private String imageCode;

        private String author;
    }

    @Data
    public static class UpdateRequest extends BlogRequest {

    }
}

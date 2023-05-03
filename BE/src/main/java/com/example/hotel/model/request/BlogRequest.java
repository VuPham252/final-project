package com.example.hotel.model.request;

import lombok.Data;

import java.util.List;

@Data
public class BlogRequest {

    private String title;

    private String description;

    private String shortDescription;

    private List<String> imgCodeList;

    private String author;

    private List<String> deleteImgCodeList;
}

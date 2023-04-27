package com.example.hotel.model.response;

import lombok.Data;

@Data
public class ContactResponse {
    private Long id;

    private String name;

    private String email;

    private String phone;

    private String subject;

    private String message;
}

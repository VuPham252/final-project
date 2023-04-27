package com.example.hotel.model.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ContactRequest extends GeneralRequest {
    @NotNull
    @NotEmpty
    private String name;

    @NotNull
    @NotEmpty
    private String email;

    @NotNull
    @NotEmpty
    private String phone;

    @NotNull
    @NotEmpty
    private String subject;

    @NotNull
    @NotEmpty
    private String message;
}

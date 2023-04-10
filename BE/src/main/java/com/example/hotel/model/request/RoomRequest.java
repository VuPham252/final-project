package com.example.hotel.model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RoomRequest {
    @NotNull
    private String name;
    @NotNull
    private Long roomTypeId;
    @NotNull
    private String description;
    @NotNull
    private double area;
    @NotNull
    private int size;
}

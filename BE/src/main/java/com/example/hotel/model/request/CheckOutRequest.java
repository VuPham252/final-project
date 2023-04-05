package com.example.hotel.model.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Data
public class CheckOutRequest {

    @NotNull
    private Long orderId;
}

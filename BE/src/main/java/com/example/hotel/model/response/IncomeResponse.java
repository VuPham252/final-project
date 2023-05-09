package com.example.hotel.model.response;

import lombok.Data;

@Data
public class IncomeResponse {
    private int booking_count;
    private Long room_type_id;
    private Double income;
}

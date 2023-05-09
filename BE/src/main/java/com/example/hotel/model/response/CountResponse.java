package com.example.hotel.model.response;

import lombok.Data;

@Data
public class CountResponse {
    private String type_name;
    private Long room_type_id;
    private int booking_count;
}

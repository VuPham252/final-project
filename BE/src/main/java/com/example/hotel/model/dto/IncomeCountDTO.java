package com.example.hotel.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncomeCountDTO {
    private int booking_count;
    private Long room_type_id;
    private String month;
}

package com.example.hotel.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingCountDTO {
    private String type_name;
    private Long room_type_id;
    private int booking_count;
    private String month;
}

package com.example.hotel.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingInMonthResponse {
    private String month;
    private List<CountResponse> bookingCountList;
}

package com.example.hotel.service;

import com.example.hotel.model.OrderBooking;
import com.example.hotel.model.response.OrderBookingResponse;

import java.util.List;

public interface OrderBookingService {
    List<OrderBookingResponse> getOrderBookingByPhone(String phoneNumber);
}

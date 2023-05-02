package com.example.hotel.service;

import com.example.hotel.model.response.BookingResponse;
import com.example.hotel.model.response.OrderBookingResponse;

import java.util.List;

public interface OrderBookingService {
    List<OrderBookingResponse> getOrderBooking(String phoneNumber);
    List<BookingResponse> getBookings(Long id);
}

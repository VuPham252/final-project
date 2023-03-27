package com.example.hotel.repository;

import com.example.hotel.model.OrderBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderBookingRepository extends JpaRepository<OrderBooking, Long> {
    public List<OrderBooking> findAllByPhoneNumber(String phoneNumber);
}

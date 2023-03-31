package com.example.hotel.repository;

import com.example.hotel.model.entity.OrderBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderBookingRepository extends JpaRepository<OrderBooking, Long> {
    List<OrderBooking> findAllByPhoneNumber(String phoneNumber);
}

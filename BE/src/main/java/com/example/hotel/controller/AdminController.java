package com.example.hotel.controller;

import com.example.hotel.model.OrderBooking;
import com.example.hotel.model.response.OrderBookingResponse;
import com.example.hotel.service.OrderBookingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {
    final OrderBookingService orderBookingService;

    public AdminController(OrderBookingService orderBookingService) {
        this.orderBookingService = orderBookingService;
    }

    @GetMapping("/orders")
    public List<OrderBookingResponse> getOrderBookingByPhone(@RequestParam(name = "phone") String phoneNumber){
        return orderBookingService.getOrderBookingByPhone(phoneNumber);
    }
}

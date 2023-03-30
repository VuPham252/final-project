package com.example.hotel.controller;

import com.example.hotel.model.response.OrderBookingResponse;
import com.example.hotel.model.response.RoomResponse;
import com.example.hotel.model.response.RoomTypeResponse;
import com.example.hotel.service.AdminService;
import com.example.hotel.service.OrderBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {

    @Autowired
    private OrderBookingService orderBookingService;

    @Autowired
    private AdminService adminService;


    @GetMapping("/orders")
    public List<OrderBookingResponse> getOrderBookingByPhone(@RequestParam(name = "phone") String phoneNumber){
        return orderBookingService.getOrderBookingByPhone(phoneNumber);
    }

    @GetMapping("/roomTypes")
    public List<RoomTypeResponse> getAllRoomType() {
        return adminService.getAllRoomTypes();
    }

    @GetMapping("/rooms")
    public List<RoomResponse> getAllRoom() {
        return adminService.getAllRoom();
    }
}

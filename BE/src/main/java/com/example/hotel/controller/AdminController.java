package com.example.hotel.controller;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.CheckInRequest;
import com.example.hotel.model.request.CheckOutRequest;
import com.example.hotel.model.response.OrderBookingResponse;
import com.example.hotel.model.response.RoomResponse;
import com.example.hotel.model.response.RoomTypeResponse;
import com.example.hotel.model.response.SuccessResponseObj;
import com.example.hotel.service.AdminService;
import com.example.hotel.service.OrderBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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



    @GetMapping("/rooms")
    public List<RoomResponse> getAllRoom() {
        return adminService.getAllRoom();
    }

    @PostMapping("/availableRooms")
    public List<RoomResponse> getAvailableRooms(@RequestBody BookingCheckRequest bookingCheckRequest) {
        return adminService.getAvailableRooms(bookingCheckRequest);
    }

    @PostMapping("/check-in")
    public ResponseEntity<SuccessResponseObj> checkIn(@RequestBody CheckInRequest checkInRequest) throws BookingBusinessException {
        return adminService.checkIn(checkInRequest);
    }

    @PostMapping("/check-out")
    public ResponseEntity<SuccessResponseObj> checkOut(@RequestBody CheckOutRequest checkOutRequest) throws BookingBusinessException {
        return adminService.checkOut(checkOutRequest);
    }

}

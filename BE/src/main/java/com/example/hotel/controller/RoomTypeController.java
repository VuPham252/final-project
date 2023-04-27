package com.example.hotel.controller;


import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.exception.SystemErrorException;
import com.example.hotel.model.response.RoomTypeResponse;
import com.example.hotel.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "api/v1/room-type")
public class RoomTypeController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/all")
    public List<RoomTypeResponse>getAllRoomType() throws IOException {
        return adminService.getAllRoomTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomTypeResponse> getRoomTypeById(@PathVariable ("id") Long id) throws SystemErrorException, BookingBusinessException, IOException {
        RoomTypeResponse roomTypeResponse = adminService.getRoomTypeById(id);
        return new ResponseEntity<>(roomTypeResponse, HttpStatus.OK);
    }

}

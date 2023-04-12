package com.example.hotel.controller;


import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.exception.RoomTypeException;
import com.example.hotel.model.entity.RoomType;
import com.example.hotel.model.request.RoomTypeRequest;
import com.example.hotel.model.response.RoomTypeResponse;
import com.example.hotel.model.response.SuccessResponseObj;
import com.example.hotel.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "api/v1/room-type")
public class RoomTypeController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/roomtypes")
    public List<RoomTypeResponse>getAllRoomType(){
        return adminService.getAllRoomTypes();
    }

}

package com.example.hotel.controller;

import com.example.hotel.exception.RoomTypeException;
import com.example.hotel.model.request.RoomRequest;
import com.example.hotel.model.response.RoomResponse;
import com.example.hotel.model.response.SuccessResponseObj;
import com.example.hotel.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/room")
public class RoomController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/rooms")
    public List<RoomResponse> getAllRoom() {
        return adminService.getAllRoom();
    }
    @GetMapping("{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable("id") Long id) throws RoomTypeException {
        RoomResponse roomResponse = adminService.getRoomById(id);
        return new ResponseEntity<>(roomResponse, HttpStatus.OK);
    }
    @PostMapping("/saveRoom")
    public ResponseEntity<SuccessResponseObj> saveRoom(@RequestBody RoomRequest roomRequest){
        return adminService.saveRoom(roomRequest);
    }

    @PutMapping("{id}")
    public ResponseEntity<RoomResponse>updateRoom(@PathVariable Long id, @RequestBody RoomResponse roomResponse) throws RoomTypeException {
        roomResponse.setId(id);
        adminService.updateRoom(roomResponse);
        return new ResponseEntity<>(roomResponse,HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public  ResponseEntity<SuccessResponseObj>deleteRoom(@PathVariable ("id")Long id){
        return adminService.deleteRoom(id);
    }
}

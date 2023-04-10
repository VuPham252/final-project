package com.example.hotel.controller;


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

    @GetMapping("{id}")
    public ResponseEntity<RoomTypeResponse> getRoomTypeById(@PathVariable ("id") Long id) throws RoomTypeException{
        RoomTypeResponse roomTypeResponse = adminService.getRoomTypeById(id);
        return new ResponseEntity<>(roomTypeResponse, HttpStatus.OK);
    }

    @PostMapping("/saveRoomType")
    public ResponseEntity<SuccessResponseObj> saveRoomType(@RequestBody RoomTypeRequest roomTypeRequest){
        return adminService.saveRoomType(roomTypeRequest);
    }
    @PutMapping("{id}")
    public ResponseEntity<RoomTypeResponse>updateRoomType(@PathVariable Long id, @RequestBody RoomTypeResponse roomTypeResponse) throws RoomTypeException {
        roomTypeResponse.setId(id);
        adminService.updateRoomType(roomTypeResponse);
        return new ResponseEntity<>(roomTypeResponse,HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public  ResponseEntity<SuccessResponseObj>deleteRoomType(@PathVariable ("id")Long id){
        return adminService.deleteRoomType(id);
    }
}

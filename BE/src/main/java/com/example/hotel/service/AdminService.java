package com.example.hotel.service;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.exception.RoomTypeException;
import com.example.hotel.model.request.*;
import com.example.hotel.model.response.RoomResponse;
import com.example.hotel.model.response.RoomTypeResponse;
import com.example.hotel.model.response.SuccessResponseObj;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminService {
    List<RoomTypeResponse> getAllRoomTypes();

    List<RoomResponse> getAllRoom();

    List<RoomResponse> getAvailableRooms(BookingCheckRequest bookingCheckRequest);

    ResponseEntity<SuccessResponseObj> checkIn(CheckInRequest checkInRequest) throws BookingBusinessException;

    ResponseEntity<SuccessResponseObj> checkOut(CheckOutRequest checkOutRequest) throws BookingBusinessException;


    //CRUD RoomType
    ResponseEntity<SuccessResponseObj> saveRoomType(RoomTypeRequest roomTypeRequest);

    RoomTypeResponse getRoomTypeById(Long id)throws RoomTypeException;

    ResponseEntity<SuccessResponseObj> updateRoomType(RoomTypeResponse roomTypeResponse) throws RoomTypeException;

    ResponseEntity<SuccessResponseObj>deleteRoomType(Long id);


    //CRUD ROOM
    ResponseEntity<SuccessResponseObj> saveRoom(RoomRequest roomRequest);

    RoomResponse getRoomById(Long id)throws RoomTypeException;

    ResponseEntity<SuccessResponseObj> updateRoom(RoomResponse roomResponse) throws RoomTypeException;

    ResponseEntity<SuccessResponseObj>deleteRoom(Long id);
}

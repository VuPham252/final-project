package com.example.hotel.service;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.entity.Room;
import com.example.hotel.model.entity.RoomType;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.CheckInRequest;
import com.example.hotel.model.request.CheckOutRequest;
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
}

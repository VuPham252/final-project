package com.example.hotel.service;

import com.example.hotel.model.entity.RoomType;
import com.example.hotel.model.response.RoomResponse;
import com.example.hotel.model.response.RoomTypeResponse;

import java.util.List;

public interface AdminService {
    public List<RoomTypeResponse> getAllRoomTypes();

    public  List<RoomResponse> getAllRoom();
}

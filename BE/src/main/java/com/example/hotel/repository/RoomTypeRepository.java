package com.example.hotel.repository;

import com.example.hotel.model.entity.Room;
import com.example.hotel.model.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {

}

package com.example.hotel.repository;

import com.example.hotel.model.Room;
import com.example.hotel.model.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
}

package com.example.hotel.repository;

import com.example.hotel.model.entity.Booking;
import com.example.hotel.model.entity.Room;
import com.example.hotel.model.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
}

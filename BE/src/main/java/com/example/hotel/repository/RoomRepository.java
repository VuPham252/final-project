package com.example.hotel.repository;

import com.example.hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    public List<Room> findByRoomTypeId(Long roomTypeId);
}

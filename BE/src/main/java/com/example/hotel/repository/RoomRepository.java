package com.example.hotel.repository;

import com.example.hotel.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByRoomTypeId(Long roomTypeId);

    List<Room> findRoomsByIdNotInAndRoomTypeId(List<Long> idList, Long roomTypeId);
}

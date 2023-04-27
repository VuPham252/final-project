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

//    @Query(value = "select * from booking where " +
//            "(check_in_date <= :inputCheckinDate and check_out_date >= :inputCheckinDate" +
//            " or " +
//            "check_in_date <= :inputCheckoutDate and check_out_date >= :inputCheckoutDate) " +
//            " and " +
//            "room_type_id = :roomTypeId",
//            nativeQuery = true)
//    List<Optional> getListRoomTypeWithImage(@Param("inputCheckinDate") LocalDate inputCheckinDate,
//                                        @Param("inputCheckoutDate") LocalDate inputCheckoutDate,
//                                        @Param("roomTypeId") long roomTypeId);
}

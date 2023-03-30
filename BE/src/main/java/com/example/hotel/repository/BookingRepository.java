package com.example.hotel.repository;

import com.example.hotel.model.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query(value = "select * from booking where " +
            "(check_in_date <= :inputCheckinDate and check_out_date >= :inputCheckinDate" +
            " or " +
            "check_in_date <= :inputCheckoutDate and check_out_date >= :inputCheckoutDate) " +
            " and " +
            "room_type_id = :roomTypeId",
            nativeQuery = true)
    public List<Booking> getListBookingByDate(@Param("inputCheckinDate") LocalDate inputCheckinDate,
                                              @Param("inputCheckoutDate") LocalDate inputCheckoutDate,
                                              @Param("roomTypeId") long roomTypeId);
}

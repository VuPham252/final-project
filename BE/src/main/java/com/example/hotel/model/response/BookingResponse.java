package com.example.hotel.model.response;

import com.example.hotel.model.enums.BookingStatus;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Data
public class BookingResponse {
    private Long id;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private Long roomTypeId;

    private String roomTypeName;

    private String roomName;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private Long roomId;

    private Long amount;
}

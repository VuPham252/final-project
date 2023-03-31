package com.example.hotel.model.entity;

import com.example.hotel.model.enums.BookingStatus;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private Long orderId;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private Long roomTypeId;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private Long roomId;

    private Long amount;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @UpdateTimestamp
    private LocalDateTime updatedTime;

}

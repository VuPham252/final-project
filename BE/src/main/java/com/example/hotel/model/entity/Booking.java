package com.example.hotel.model.entity;

import com.example.hotel.model.dto.BookingCountDTO;
import com.example.hotel.model.dto.IncomeCountDTO;
import com.example.hotel.model.enums.BookingStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NamedNativeQuery(
        name = "BookingCount",
        query = """
        SELECT rt.type_name , b.room_type_id , COUNT(*) as booking_count, DATE_FORMAT(b.created_time,'%M')  as month\s
        from  booking b\s
        inner join room_type rt
        on b.room_type_id = rt.id\s
        where b.created_time  < ?1\s
        group by b.room_type_id, DATE_FORMAT(b.created_time,'%M')
        order by booking_count desc;
        """,
        resultSetMapping = "BookingCountMapping"
)

@NamedNativeQuery(
        name = "InComeCount",
        query = """
        select Count(*) as booking_count, room_type_id, DATE_FORMAT(booking.check_out_date,'%M') as month
                                   from booking
                                   where created_time < ?1
                                   and status = 'CHECKED_OUT'
                                   group by room_type_id, DATE_FORMAT(booking.check_out_date,'%M');
        """,
        resultSetMapping = "IncomeCountMapping"
)

@SqlResultSetMapping(name="BookingCountMapping",
        classes = {
                @ConstructorResult(
                        targetClass = BookingCountDTO.class,
                        columns = {
                                @ColumnResult(name="type_name", type = String.class),
                                @ColumnResult(name="room_type_id", type = Long.class),
                                @ColumnResult(name="booking_count", type = int.class),
                                @ColumnResult(name="month", type = String.class)}
                )}
)

@SqlResultSetMapping(name="IncomeCountMapping",
        classes = {
                @ConstructorResult(
                        targetClass = IncomeCountDTO.class,
                        columns = {
                                @ColumnResult(name="booking_count", type = int.class),
                                @ColumnResult(name="room_type_id", type = Long.class),
                                @ColumnResult(name="month", type = String.class)}
                )}
)
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

    @ManyToOne
    @JsonBackReference
    private OrderBooking orderBooking;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private Long roomTypeId;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private Long roomId;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @UpdateTimestamp
    private LocalDateTime updatedTime;

}

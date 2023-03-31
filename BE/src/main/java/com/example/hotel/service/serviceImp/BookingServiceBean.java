package com.example.hotel.service.serviceImp;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.entity.Booking;
import com.example.hotel.model.entity.OrderBooking;
import com.example.hotel.model.entity.RoomType;
import com.example.hotel.model.enums.BookingStatus;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.BookingRequest;
import com.example.hotel.model.request.OrderRequest;
import com.example.hotel.model.response.SuccessResponseObj;
import com.example.hotel.repository.BookingRepository;
import com.example.hotel.repository.OrderBookingRepository;
import com.example.hotel.repository.RoomRepository;
import com.example.hotel.repository.RoomTypeRepository;
import com.example.hotel.service.BookingService;
import com.example.hotel.utils.Utils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingServiceBean implements BookingService {

    final BookingRepository bookingRepository;

    final RoomRepository roomRepository;

    final RoomTypeRepository roomTypeRepository;

    final OrderBookingRepository orderBookingRepository;

    public BookingServiceBean(BookingRepository bookingRepository,
                              RoomRepository roomRepository,
                              RoomTypeRepository roomTypeRepository,
                              OrderBookingRepository orderBookingRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.orderBookingRepository = orderBookingRepository;
    }

    @Override
    public int getNumberOfAvailableRooms(BookingCheckRequest bookingCheckRequest) throws BookingBusinessException {

        int numberOfAvailableRoom = 0;

        List<RoomType> roomTypeList = roomTypeRepository.findAll();

        if (!isValidRoomTypeId(bookingCheckRequest, roomTypeList)) {
            throw new BookingBusinessException("Invalid Room Type Id");
        }

        List<Booking> bookingList = bookingRepository.getListBookingByDate(
                bookingCheckRequest.getInputCheckinDate(),
                bookingCheckRequest.getInputCheckoutDate(),
                bookingCheckRequest.getRoomTypeId());

        LocalDate requestCheckInDate = bookingCheckRequest.getInputCheckinDate();
        LocalDate requestCheckOutDate = bookingCheckRequest.getInputCheckoutDate();

        Map<LocalDate, Integer> dateStatusMap = new HashMap<LocalDate, Integer>();

        for (Booking booking : bookingList) {
            LocalDate checkInDate = booking.getCheckInDate();
            LocalDate checkOutDate = booking.getCheckOutDate();

            LocalDate startDate = checkInDate.compareTo(requestCheckInDate) <= 0 ? requestCheckInDate : checkInDate;
            LocalDate endDate =  checkOutDate.compareTo(requestCheckOutDate) <= 0 ? checkOutDate : requestCheckOutDate;

            List<LocalDate> dateList = startDate.datesUntil(endDate.plusDays(1)).collect(Collectors.toList());

            for (LocalDate date : dateList) {
                if (dateStatusMap.containsKey(date)){
                    dateStatusMap.put(date, dateStatusMap.get(date) + 1);
                } else {
                    dateStatusMap.put(date, 1);
                }
            }
        }
        int maxValueInMap =  bookingList.size() == 0 ? 0 : (Collections.max(dateStatusMap.values()));
        int maxOrderInDay = roomRepository.findByRoomTypeId(bookingCheckRequest.getRoomTypeId()).size();

        numberOfAvailableRoom = maxOrderInDay - maxValueInMap;
        return numberOfAvailableRoom;
    }

    @Override
    @Transactional
    public ResponseEntity<SuccessResponseObj> bookingRooms(OrderRequest orderRequest) throws BookingBusinessException {
        List<RoomType> roomTypeList = roomTypeRepository.findAll();

        for (BookingRequest bookingRequest : orderRequest.getBookingRequestList()) {
            if (!isValidRoomTypeId(bookingRequest, roomTypeList)) {
                throw new BookingBusinessException("Invalid Room Type Id");
            }
        }

        OrderBooking orderBooking = OrderBooking.builder()
                .customerName(orderRequest.getCustomerName())
                .email(orderRequest.getEmail())
                .phoneNumber(orderRequest.getPhoneNumber())
                .build();

        OrderBooking createdOrderBooking = orderBookingRepository.save(orderBooking);

        for (BookingRequest bookingRequest : orderRequest.getBookingRequestList()) {
            Booking booking = Booking.builder()
                    .orderId(createdOrderBooking.getId())
                    .checkInDate(bookingRequest.getInputCheckinDate())
                    .checkOutDate(bookingRequest.getInputCheckoutDate())
                    .roomTypeId(bookingRequest.getRoomTypeId())
                    .amount(bookingRequest.getAmount())
                    .status(BookingStatus.ORDERED).build();
            bookingRepository.save(booking);
        }

        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Booking Successfully").build();

        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }

    public Boolean isValidRoomTypeId(Object requestObject, List<RoomType> roomTypeList){
        Long roomTypeId = Utils.getRoomTypeId(requestObject);
        return roomTypeList.stream().anyMatch(roomType -> roomType.getId().equals(roomTypeId));
    }

}

package com.example.hotel.service.serviceImp;

import com.example.hotel.model.entity.Booking;
import com.example.hotel.model.entity.OrderBooking;
import com.example.hotel.model.entity.Room;
import com.example.hotel.model.entity.RoomType;
import com.example.hotel.model.response.BookingResponse;
import com.example.hotel.model.response.OrderBookingResponse;
import com.example.hotel.repository.BookingRepository;
import com.example.hotel.repository.OrderBookingRepository;
import com.example.hotel.repository.RoomRepository;
import com.example.hotel.repository.RoomTypeRepository;
import com.example.hotel.service.OrderBookingService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class OrderBookingServiceBean implements OrderBookingService {

    final OrderBookingRepository orderBookingRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    RoomRepository roomRepository;

    public OrderBookingServiceBean(OrderBookingRepository orderBookingRepository) {
        this.orderBookingRepository = orderBookingRepository;
    }

    @Override
    @Transactional
    public List<OrderBookingResponse> getOrderBooking(String phoneNumber) {
        List<OrderBooking> orderBookingList;
        if(phoneNumber.isEmpty() || phoneNumber.isBlank()) {
            orderBookingList = orderBookingRepository.findAll();
        } else {
            orderBookingList = orderBookingRepository.findAllByPhoneNumber(phoneNumber);
        }
        List<OrderBookingResponse> orderBookingResponseList = new ArrayList<>();
        for (OrderBooking orderBooking : orderBookingList) {
            OrderBookingResponse orderBookingResponse = new OrderBookingResponse();
            BeanUtils.copyProperties(orderBooking, orderBookingResponse);
            orderBookingResponseList.add(orderBookingResponse);
            Set<String> roomTypeNameList = new HashSet<>();
            for (Booking booking : orderBooking.getBookingList()) {
                RoomType roomType = roomTypeRepository.findById(booking.getRoomTypeId()).orElseThrow();
                roomTypeNameList.add(roomType.getTypeName());
            }
            orderBookingResponse.setRoomTypeNameList(roomTypeNameList.stream().toList());
        }
        return  orderBookingResponseList;
    }

    @Override
    @Transactional
    public List<BookingResponse> getBookings(Long id) {
        List<Booking> bookingList = bookingRepository.getBookingsByOrderId(id);
        List<BookingResponse> bookingResponseList = new ArrayList<>();
        for (Booking booking : bookingList) {

            RoomType roomType = roomTypeRepository.findById(booking.getRoomTypeId()).orElseThrow();
            BookingResponse bookingResponse = new BookingResponse();
            BeanUtils.copyProperties(booking, bookingResponse);
            bookingResponse.setRoomTypeName(roomType.getTypeName());
            if(booking.getRoomId() != null) {
                Optional<Room> room = roomRepository.findById(booking.getRoomId());
                if(room.isPresent()){
                    bookingResponse.setRoomName(room.get().getName());
                }
            }
            bookingResponseList.add(bookingResponse);
        }
        return bookingResponseList;
    }
}

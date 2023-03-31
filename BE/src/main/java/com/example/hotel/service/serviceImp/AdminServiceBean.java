package com.example.hotel.service.serviceImp;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.entity.Booking;
import com.example.hotel.model.entity.Room;
import com.example.hotel.model.entity.RoomType;
import com.example.hotel.model.enums.BookingStatus;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.CheckInRequest;
import com.example.hotel.model.response.OrderBookingResponse;
import com.example.hotel.model.response.RoomResponse;
import com.example.hotel.model.response.RoomTypeResponse;
import com.example.hotel.model.response.SuccessResponseObj;
import com.example.hotel.repository.BookingRepository;
import com.example.hotel.repository.RoomRepository;
import com.example.hotel.repository.RoomTypeRepository;
import com.example.hotel.service.AdminService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminServiceBean implements AdminService {

    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Override
    public List<RoomTypeResponse> getAllRoomTypes() {
        List<RoomType> roomTypeList = roomTypeRepository.findAll();
        List<RoomTypeResponse> roomTypeResponseList = new ArrayList<>();

        for (RoomType roomType : roomTypeList) {
            RoomTypeResponse roomTypeResponse = new RoomTypeResponse();
            BeanUtils.copyProperties(roomType, roomTypeResponse);
            roomTypeResponseList.add(roomTypeResponse);
        }
        return  roomTypeResponseList;
    }

    @Override
    public List<RoomResponse> getAllRoom() {
        List<Room> roomList = roomRepository.findAll();
        List<RoomResponse> roomResponseList = new ArrayList<>();

        for (Room room : roomList) {
            RoomResponse roomResponse = new RoomResponse();
            BeanUtils.copyProperties(room, roomResponse);
            roomResponseList.add(roomResponse);
        }
        return  roomResponseList;
    }

    @Override
    public List<RoomResponse> getAvailableRooms(BookingCheckRequest bookingCheckRequest) {
        List<Long> roomIdList = bookingRepository.getBookedRooms(
                bookingCheckRequest.getInputCheckinDate(),
                bookingCheckRequest.getInputCheckoutDate(),
                bookingCheckRequest.getRoomTypeId());
        List<Room> availableRoomList;
        List<RoomResponse> availableRoomResponseList = new ArrayList<>();

        if (roomIdList.isEmpty()) {
            availableRoomList = roomRepository.findByRoomTypeId(bookingCheckRequest.getRoomTypeId());
        } else {
            availableRoomList = roomRepository.findRoomsByIdNotInAndRoomTypeId(roomIdList, bookingCheckRequest.getRoomTypeId());
        }

        for (Room room : availableRoomList) {
            RoomResponse roomResponse = new RoomResponse();
            BeanUtils.copyProperties(room, roomResponse);
            availableRoomResponseList.add(roomResponse);
        }
        return availableRoomResponseList;
    }

    @Override
    public ResponseEntity<SuccessResponseObj> checkIn(CheckInRequest checkInRequest) throws BookingBusinessException {
        Booking currentBooking = bookingRepository.findById(checkInRequest.getOrderId())
                .orElseThrow(() -> new BookingBusinessException("There is no booking with id: " + checkInRequest.getOrderId()));

        if(currentBooking.getStatus().equals(BookingStatus.CHECKED_IN)) {
            throw new BookingBusinessException("This booking is already checked-in!");
        }

        Booking updatedBooking = new Booking();
        BeanUtils.copyProperties(currentBooking, updatedBooking);
        updatedBooking.setStatus(BookingStatus.CHECKED_IN);
        updatedBooking.setRoomId(checkInRequest.getRoomId());
        bookingRepository.save(updatedBooking);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Checked in Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }
}

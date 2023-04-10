package com.example.hotel.service.serviceImp;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.exception.RoomTypeException;
import com.example.hotel.model.entity.Booking;
import com.example.hotel.model.entity.Room;
import com.example.hotel.model.entity.RoomType;
import com.example.hotel.model.enums.BookingStatus;
import com.example.hotel.model.request.*;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
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

    @Override
    public ResponseEntity<SuccessResponseObj> checkOut(CheckOutRequest checkOutRequest) throws BookingBusinessException {
        Booking currentBooking = bookingRepository.findById(checkOutRequest.getOrderId())
                .orElseThrow(() -> new BookingBusinessException("There is no booking with id: " + checkOutRequest.getOrderId()));

        if(currentBooking.getStatus().equals(BookingStatus.CHECKED_OUT)) {
            throw new BookingBusinessException("This booking is already checked-out!");
        }

        currentBooking.setStatus(BookingStatus.CHECKED_OUT);
        bookingRepository.save(currentBooking);

        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Checked out Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }


    //CRUD roomtype

    public ResponseEntity<SuccessResponseObj> saveRoomType(@RequestBody RoomTypeRequest roomTypeRequest){
        RoomType roomType = RoomType.builder().typeName(roomTypeRequest.getTypeName()).price(roomTypeRequest.getPrice()).build();
        roomTypeRepository.save(roomType);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Add Roomtype Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }
    @Override
    public RoomTypeResponse getRoomTypeById(Long id) throws RoomTypeException {
        RoomType roomType = roomTypeRepository.findById(id).orElseThrow();
        RoomTypeResponse roomTypeResponse = new RoomTypeResponse();
        BeanUtils.copyProperties(roomType, roomTypeResponse);
        return  roomTypeResponse;
    }


    @Override
    public ResponseEntity<SuccessResponseObj> updateRoomType(RoomTypeResponse roomTypeResponse) throws RoomTypeException {
        RoomType existRoomType = roomTypeRepository.findById(roomTypeResponse.getId()).get();
        existRoomType.setTypeName(roomTypeResponse.getTypeName());
        existRoomType.setPrice(roomTypeResponse.getPrice());
        existRoomType.setUpdatedTime(roomTypeResponse.getUpdatedTime());
        roomTypeRepository.save(existRoomType);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Update Roomtype Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SuccessResponseObj> deleteRoomType(Long id) {
        roomTypeRepository.deleteById(id);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Delete Roomtype Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }


    //CRUD ROOM
    @Override
    public ResponseEntity<SuccessResponseObj> saveRoom(RoomRequest roomRequest) {
        Room room = Room.builder().name(roomRequest.getName())
                .roomTypeId(roomRequest.getRoomTypeId())
                .description(roomRequest.getDescription())
                .area(roomRequest.getArea())
                .size(roomRequest.getSize())
                .build();
        roomRepository.save(room);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Add Room Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }

    @Override
    public RoomResponse getRoomById(Long id) throws RoomTypeException {
        Room room = roomRepository.findById(id).orElseThrow();
        RoomResponse roomResponse = new RoomResponse();
        BeanUtils.copyProperties(room, roomResponse);
        return  roomResponse;
    }

    @Override
    public ResponseEntity<SuccessResponseObj> updateRoom(RoomResponse roomResponse) throws RoomTypeException {
        Room existRoom = roomRepository.findById(roomResponse.getId()).get();
        existRoom.setName(roomResponse.getName());
        existRoom.setRoomTypeId(roomResponse.getRoomTypeId());
        existRoom.setDescription(roomResponse.getDescription());
        existRoom.setArea(roomResponse.getArea());
        existRoom.setSize(roomResponse.getSize());
        existRoom.setUpdatedTime(roomResponse.getUpdatedTime());
        roomRepository.save(existRoom);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Update Room Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SuccessResponseObj> deleteRoom(Long id) {
        roomRepository.deleteById(id);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Delete Room Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }

}

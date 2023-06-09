package com.example.hotel.service;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.exception.SystemErrorException;
import com.example.hotel.model.request.*;
import com.example.hotel.model.response.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    List<RoomTypeResponse> getAllRoomTypes() throws IOException;

    List<RoomResponse> getAllRoom();

    List<RoomResponse> getAvailableRooms(BookingCheckRequest bookingCheckRequest);

    ResponseEntity<SuccessResponseObj> checkIn(CheckInRequest checkInRequest) throws BookingBusinessException;

    ResponseEntity<SuccessResponseObj> checkOut(CheckOutRequest checkOutRequest) throws BookingBusinessException;

    ResponseEntity<SuccessResponseObj> cancelBooking(CheckOutRequest checkOutRequest) throws BookingBusinessException;


    //CRUD RoomType
    ResponseEntity<SuccessResponseObj> saveRoomType(RoomTypeRequest roomTypeRequest) throws SystemErrorException;

    RoomTypeResponse getRoomTypeById(Long id) throws SystemErrorException, BookingBusinessException, IOException;

    ResponseEntity<SuccessResponseObj> updateRoomType(RoomTypeRequest roomTypeRequest, Long id) throws BookingBusinessException, IOException;

    ResponseEntity<CommonResponseObj>deleteRoomType(Long id);


    //CRUD ROOM
    ResponseEntity<SuccessResponseObj> saveRoom(RoomRequest roomRequest);

    RoomResponse getRoomById(Long id)throws SystemErrorException;

    ResponseEntity<SuccessResponseObj> updateRoom(RoomRequest roomRequest, Long id) throws SystemErrorException, BookingBusinessException;

    ResponseEntity<SuccessResponseObj>deleteRoom(Long id);

    //CONTACT
    List<ContactResponse> getAllContact();

    ContactResponse getContactById(Long id);

    //CRUD BLOG
    ResponseEntity<SuccessResponseObj> saveBlog(BlogRequest newRequest) throws SystemErrorException;

    BlogResponse getBlogById(Long id) throws SystemErrorException, IOException;

    ResponseEntity<SuccessResponseObj> updateBlog(BlogRequest updateRequest, Long id) throws SystemErrorException, BookingBusinessException, IOException;

    ResponseEntity<SuccessResponseObj>deleteBlog(Long id);

    List<BlogResponse> getAllBlog() throws IOException;
}

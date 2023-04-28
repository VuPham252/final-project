package com.example.hotel.service.serviceImp;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.exception.SystemErrorException;
import com.example.hotel.model.entity.*;
import com.example.hotel.model.enums.BookingStatus;
import com.example.hotel.model.request.*;
import com.example.hotel.model.response.*;
import com.example.hotel.repository.*;
import com.example.hotel.service.AdminService;
import com.example.hotel.utils.FileDownloadUtil;
import com.example.hotel.utils.FileUtil;
import com.example.hotel.utils.Utils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminServiceBean implements AdminService {

    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ContactRepository contactRepository;

    @Autowired
    BlogRepository blogRepository;

    @Override
    @Transactional
    public List<RoomTypeResponse> getAllRoomTypes() throws IOException {
        List<RoomType> roomTypeList = roomTypeRepository.findAll();
        List<RoomTypeResponse> roomTypeResponseList = new ArrayList<>();

        for (RoomType roomType : roomTypeList) {
            RoomTypeResponse roomTypeResponse = new RoomTypeResponse();
            BeanUtils.copyProperties(roomType, roomTypeResponse);
            roomTypeResponse.setImgEncodeStringList(Utils.createImgEncodeString(roomType.getImageList()));
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

    @Transactional(rollbackFor = SystemErrorException.class)
    public ResponseEntity<SuccessResponseObj> saveRoomType(@RequestBody RoomTypeRequest roomTypeRequest) throws SystemErrorException {
        RoomType roomType = RoomType.builder().typeName(roomTypeRequest.getTypeName()).price(roomTypeRequest.getPrice()).build();
        try{
            RoomType savedRoomType = roomTypeRepository.save(roomType);
            saveImage(roomTypeRequest.getImgCodeList(), savedRoomType);
        }catch (Exception e) {
            throw new SystemErrorException("System error: Can not create room type");
        }
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Add room type Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.CREATED);
    }
    @Override
    public RoomTypeResponse getRoomTypeById(Long id) throws BookingBusinessException, IOException {
        RoomType roomType = roomTypeRepository.findById(id).orElseThrow(() -> new BookingBusinessException("Error: There is no room type with id: " + id));
        RoomTypeResponse roomTypeResponse = new RoomTypeResponse();
        BeanUtils.copyProperties(roomType, roomTypeResponse);
        roomTypeResponse.setImgEncodeStringList(Utils.createImgEncodeString(roomType.getImageList()));
        return  roomTypeResponse;
    }


    @Override
    @Transactional
    public ResponseEntity<SuccessResponseObj> updateRoomType(RoomTypeRequest roomTypeRequest, Long id) throws BookingBusinessException, IOException {
        RoomType existRoomType = roomTypeRepository.findById(id).orElseThrow(() -> new BookingBusinessException("Error: There is no room type with id: " + id));
        List<String> existedImgCodeList = existRoomType.getImageList().stream().map(Image::getFileCode).collect(Collectors.toList());
        existRoomType.setTypeName(roomTypeRequest.getTypeName());
        existRoomType.setPrice(roomTypeRequest.getPrice());
        roomTypeRepository.save(existRoomType);

        if(!Objects.isNull(roomTypeRequest.getImgCodeList())){
            roomTypeRequest.getImgCodeList().removeAll(existedImgCodeList);
            saveImage(roomTypeRequest.getImgCodeList(), existRoomType);
        }

        if(!Objects.isNull(roomTypeRequest.getDeleteImgCodeList())) {
            imageRepository.deleteByFileCodeIn(roomTypeRequest.getDeleteImgCodeList());
            FileUtil.deleteFile(roomTypeRequest.getDeleteImgCodeList());
        }

        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Update Roomtype Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }

    private void saveImage (List<String> imgCodeList, RoomType roomType) throws IOException {
        List<Image> imgList = new ArrayList<>();
        for (String imgCode : imgCodeList) {
            Image image = Image.builder()
                    .roomType(roomType)
                    .fileCode(imgCode)
                    .filePath(FileDownloadUtil.getFilePath(imgCode)).build();
            imgList.add(image);
        }
        imageRepository.saveAll(imgList);
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
                .statusCode(HttpStatus.CREATED.value())
                .message("Add Room Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.CREATED);
    }

    @Override
    public RoomResponse getRoomById(Long id) {
        Room room = roomRepository.findById(id).orElseThrow();
        RoomResponse roomResponse = new RoomResponse();
        BeanUtils.copyProperties(room, roomResponse);
        return  roomResponse;
    }

    @Override
    public ResponseEntity<SuccessResponseObj> updateRoom(RoomRequest roomRequest, Long id) throws BookingBusinessException {
        Room existRoom = roomRepository.findById(id).orElseThrow(() -> new BookingBusinessException("Error: There is no room with id: " + id));
        existRoom.setName(roomRequest.getName());
        existRoom.setRoomTypeId(roomRequest.getRoomTypeId());
        existRoom.setDescription(roomRequest.getDescription());
        existRoom.setArea(roomRequest.getArea());
        existRoom.setSize(roomRequest.getSize());
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

    @Override
    public List<ContactResponse> getAllContact() {
        List<Contact> contactList = contactRepository.findAll();
        List<ContactResponse> contactResponseList = new ArrayList<>();
        for (Contact contact : contactList) {
            ContactResponse contactResponse = new ContactResponse();
            BeanUtils.copyProperties(contact, contactResponse);
            contactResponseList.add(contactResponse);
        }
        return contactResponseList;
    }

    @Override
    public ContactResponse getContactById(Long id) {
        Contact contact = contactRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Contact not found."));
        ContactResponse contactResponse = new ContactResponse();
        BeanUtils.copyProperties(contact, contactResponse);
        return contactResponse;
    }

    @Override
    public ResponseEntity<SuccessResponseObj> saveBlog(BlogRequest.NewRequest blogRequest) {
        Blog blog = Blog.builder()
                .title(blogRequest.getTitle())
                .shortDescription(blogRequest.getShortDescription())
                .description(blogRequest.getDescription())
                .display(blogRequest.getDisplay()).build();
        blogRepository.save(blog);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Add Blog Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.CREATED);
    }

    @Override
    public BlogResponse getBlogById(Long id) throws SystemErrorException, IOException {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Blog not found."));
        BlogResponse blogResponse = new BlogResponse();
        BeanUtils.copyProperties(blog, blogResponse);
        blogResponse.setImageEncodedStringList(Utils.createImgEncodeString(Collections.singletonList(blog.getImage())));
        return blogResponse;
    }

    @Override
    public ResponseEntity<SuccessResponseObj> updateBlog(BlogRequest.UpdateRequest updateRequest, Long id) throws SystemErrorException, BookingBusinessException {
        Blog existBlog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Blog not found."));
        existBlog.setTitle(updateRequest.getTitle());
        existBlog.setDescription(updateRequest.getDescription());
        existBlog.setShortDescription(updateRequest.getShortDescription());
        blogRepository.save(existBlog);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Update Blog Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SuccessResponseObj> deleteBlog(Long id) {
        blogRepository.deleteById(id);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Delete Blog Successfully").build();
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }

}

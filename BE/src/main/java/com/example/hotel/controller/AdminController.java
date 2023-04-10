package com.example.hotel.controller;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.CheckInRequest;
import com.example.hotel.model.request.CheckOutRequest;
import com.example.hotel.model.response.*;
import com.example.hotel.service.AdminService;
import com.example.hotel.service.OrderBookingService;
import com.example.hotel.utils.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {

    @Autowired
    private OrderBookingService orderBookingService;

    @Autowired
    private AdminService adminService;


    @GetMapping("/orders")
    public List<OrderBookingResponse> getOrderBookingByPhone(@RequestParam(name = "phone") String phoneNumber){
        return orderBookingService.getOrderBookingByPhone(phoneNumber);
    }

    @PostMapping("/availableRooms")
    public List<RoomResponse> getAvailableRooms(@RequestBody BookingCheckRequest bookingCheckRequest) {
        return adminService.getAvailableRooms(bookingCheckRequest);
    }

    @PostMapping("/check-in")
    public ResponseEntity<SuccessResponseObj> checkIn(@RequestBody CheckInRequest checkInRequest) throws BookingBusinessException {
        return adminService.checkIn(checkInRequest);
    }

    @PostMapping("/check-out")
    public ResponseEntity<SuccessResponseObj> checkOut(@RequestBody CheckOutRequest checkOutRequest) throws BookingBusinessException {
        return adminService.checkOut(checkOutRequest);
    }

    @PostMapping("/uploadFile")
    public ResponseEntity<FileUploadResponse> uploadFile(
            @RequestParam("file") MultipartFile multipartFile)
            throws IOException {

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        long size = multipartFile.getSize();

        String filecode = FileUploadUtil.saveFile(fileName, multipartFile);

        FileUploadResponse response = new FileUploadResponse();
        response.setFileName(fileName);
        response.setSize(size);
        response.setDownloadUri("/downloadFile/" + filecode);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

package com.example.hotel.controller;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.BookingRequest;
import com.example.hotel.model.request.OrderRequest;
import com.example.hotel.model.response.SuccessResponseObj;
import com.example.hotel.service.BookingService;
import com.example.hotel.utils.FileDownloadUtil;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/booking")
public class BookingController {

    final
    BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/available-rooms")
    public int getAvailableRoom(@RequestBody @Valid BookingCheckRequest bookingCheckRequest) throws BookingBusinessException {
        return bookingService.getNumberOfAvailableRooms(bookingCheckRequest);
    }

    @PostMapping("/booking-rooms")
    public ResponseEntity<SuccessResponseObj> bookARoom(@RequestBody @Valid OrderRequest orderRequest) throws BookingBusinessException, MessagingException {
        return bookingService.bookingRooms(orderRequest);
    }

    @GetMapping("/downloadFile/{fileCode}")
    public ResponseEntity<?> downloadFile(@PathVariable("fileCode") String fileCode) {
        FileDownloadUtil downloadUtil = new FileDownloadUtil();

        Resource resource = null;
        try {
            resource = downloadUtil.getFileAsResource(fileCode);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }

        if (resource == null) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }

        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }
}

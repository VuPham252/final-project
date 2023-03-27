package com.example.hotel.controller;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.BookingRequest;
import com.example.hotel.model.request.OrderRequest;
import com.example.hotel.model.response.SuccessResponseObj;
import com.example.hotel.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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
    public ResponseEntity<SuccessResponseObj> bookARoom(@RequestBody @Valid OrderRequest orderRequest) throws BookingBusinessException {
        return bookingService.bookingRooms(orderRequest);
    }

}

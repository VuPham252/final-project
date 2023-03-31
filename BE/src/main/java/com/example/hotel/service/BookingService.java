package com.example.hotel.service;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.BookingRequest;
import com.example.hotel.model.request.OrderRequest;
import com.example.hotel.model.response.SuccessResponseObj;
import org.springframework.http.ResponseEntity;


public interface BookingService {

    int getNumberOfAvailableRooms(BookingCheckRequest bookingCheckRequest) throws BookingBusinessException;

    ResponseEntity<SuccessResponseObj> bookingRooms(OrderRequest orderRequest) throws BookingBusinessException;
}

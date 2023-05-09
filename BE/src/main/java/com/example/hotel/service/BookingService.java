package com.example.hotel.service;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.OrderRequest;
import com.example.hotel.model.response.BookingCountResponse;
import com.example.hotel.model.response.IncomeInMonthResponse;
import com.example.hotel.model.response.SuccessResponseObj;
import org.springframework.http.ResponseEntity;

import javax.mail.MessagingException;
import java.util.List;


public interface BookingService {

    int getNumberOfAvailableRooms(BookingCheckRequest bookingCheckRequest) throws BookingBusinessException;

    ResponseEntity<SuccessResponseObj> bookingRooms(OrderRequest orderRequest) throws BookingBusinessException, MessagingException;

    BookingCountResponse getBookingCount(String year);

    List<IncomeInMonthResponse> getIncomeInMonths(String year);
}

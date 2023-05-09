package com.example.hotel.model.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
public class BookingCountResponse {

    private List<BookingInMonthResponse> bookingCountResponseList = new ArrayList<>();

    public void createResponseList() {
        bookingCountResponseList.add(new BookingInMonthResponse("January", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("February", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("March", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("April", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("May", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("June", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("July", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("August", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("September", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("October", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("November", new ArrayList<>()));
        bookingCountResponseList.add(new BookingInMonthResponse("December", new ArrayList<>()));
    }
}

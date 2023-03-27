package com.example.hotel.exception;

public class BookingBusinessException extends Exception {
    public BookingBusinessException(String errorMessage){
        super(errorMessage);
    }
}

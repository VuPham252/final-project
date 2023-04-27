package com.example.hotel.exception;

public class SystemErrorException extends Exception{
    public SystemErrorException(String errorMessage){
        super(errorMessage);
    }
}

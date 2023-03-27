package com.example.hotel.exception;

import com.example.hotel.constant.AppConstant;
import com.example.hotel.model.response.ErrorResponseObj;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class BookingExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseObj> handleInvalidArgument(MethodArgumentNotValidException ex) {

        // This map store the error fields and corresponding error messages
        Map<String, String> errors = new HashMap<String, String>();

        // Get all error fields and corresponding error messages.
        ex.getBindingResult().getFieldErrors().forEach( error -> {

                    // Get info of error field with format: "field name: value"
                    StringBuilder fieldInfo = new StringBuilder();
                    fieldInfo.append(error.getField())
                            .append(AppConstant._COLON)
                            .append(error.getRejectedValue());

                    // Put error field info and error message into the map.
                    errors.put(fieldInfo.toString(), error.getDefaultMessage());
                }
        );
        ErrorResponseObj errObj = ErrorResponseObj.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .errors(errors).build();
        return new ResponseEntity<>(errObj, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BookingBusinessException.class)
    public ResponseEntity<ErrorResponseObj> handleBusinessException(BookingBusinessException ex) {
        // This map store the error fields and corresponding error messages
        Map<String, String> errors = new HashMap<String, String>();

        // Add error message to the stored map
        errors.put(AppConstant._LABEL._ERROR_MESSAGE, ex.getMessage());

        ErrorResponseObj errObj = ErrorResponseObj.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .errors(errors).build();
        return new ResponseEntity<>(errObj, HttpStatus.BAD_REQUEST);
    }
}

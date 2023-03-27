package com.example.hotel.model.response;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponseObj {
    private int statusCode;
    private Map<String, String> errors;
}

package com.example.hotel.model.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommonResponseObj {
    private int statusCode;
    private String message;
}

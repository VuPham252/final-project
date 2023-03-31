package com.example.hotel.model.request;

import com.example.hotel.constant.AppConstant;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckInRequest {

    @NotNull
    private Long orderId;

    @NotNull
    private Long roomId;
}

package com.example.hotel.model.request;

import com.example.hotel.constant.AppConstant;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AppConstant.LOCAL_DATE_DEFAULT_FORMAT)
    private LocalDate inputCheckinDate;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = AppConstant.LOCAL_DATE_DEFAULT_FORMAT)
    private LocalDate inputCheckoutDate;

    @NotNull
    private Long roomTypeId;

    @NotNull
    private Long amount;

}

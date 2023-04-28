package com.example.hotel.model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Data
public class RoomTypeRequest {

    @NotNull
    private String typeName;
    @NotNull
    private BigDecimal price;

    private List<String> imgCodeList;

    private List<String> deleteImgCodeList;

}

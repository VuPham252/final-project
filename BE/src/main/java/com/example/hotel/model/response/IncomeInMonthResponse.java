package com.example.hotel.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncomeInMonthResponse {
    private String month;
    private BigDecimal income;
}

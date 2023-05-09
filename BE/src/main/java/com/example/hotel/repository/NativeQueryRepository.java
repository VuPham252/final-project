package com.example.hotel.repository;

import com.example.hotel.model.dto.BookingCountDTO;
import com.example.hotel.model.dto.IncomeCountDTO;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class NativeQueryRepository {

    @PersistenceContext
    EntityManager entityManager;

    public List<BookingCountDTO> getBookingCount(String year) {
        String yearValue = year + "-12-31";
        List<BookingCountDTO> bookingCountDTOList = this.entityManager
                .createNamedQuery("BookingCount", BookingCountDTO.class)
                .setParameter(1, yearValue)
                .getResultList();
        return bookingCountDTOList;
    }

    public List<IncomeCountDTO> getIncomeCount(String year) {
        String yearValue = year + "-12-31";
        List<IncomeCountDTO> incomeCountDTOList = this.entityManager
                .createNamedQuery("InComeCount", IncomeCountDTO.class)
                .setParameter(1, yearValue)
                .getResultList();
        return incomeCountDTOList;
    }
}

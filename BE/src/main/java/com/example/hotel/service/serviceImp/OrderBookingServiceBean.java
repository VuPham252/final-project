package com.example.hotel.service.serviceImp;

import com.example.hotel.model.entity.OrderBooking;
import com.example.hotel.model.response.OrderBookingResponse;
import com.example.hotel.repository.OrderBookingRepository;
import com.example.hotel.service.OrderBookingService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderBookingServiceBean implements OrderBookingService {

    final OrderBookingRepository orderBookingRepository;

    public OrderBookingServiceBean(OrderBookingRepository orderBookingRepository) {
        this.orderBookingRepository = orderBookingRepository;
    }

    @Override
    public List<OrderBookingResponse> getOrderBookingByPhone(String phoneNumber) {
        List<OrderBooking> orderBookingList = orderBookingRepository.findAllByPhoneNumber(phoneNumber);
        List<OrderBookingResponse> orderBookingResponseList = new ArrayList<>();
        for (OrderBooking orderBooking : orderBookingList) {
            OrderBookingResponse orderBookingResponse = new OrderBookingResponse();
            BeanUtils.copyProperties(orderBooking, orderBookingResponse);
            orderBookingResponseList.add(orderBookingResponse);
        }
        return  orderBookingResponseList;
    }
}

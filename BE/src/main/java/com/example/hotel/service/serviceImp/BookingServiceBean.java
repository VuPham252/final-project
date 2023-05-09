package com.example.hotel.service.serviceImp;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.dto.BookingCountDTO;
import com.example.hotel.model.dto.IncomeCountDTO;
import com.example.hotel.model.entity.Booking;
import com.example.hotel.model.entity.OrderBooking;
import com.example.hotel.model.entity.RoomType;
import com.example.hotel.model.enums.BookingStatus;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.BookingRequest;
import com.example.hotel.model.request.GeneralRequest;
import com.example.hotel.model.request.OrderRequest;
import com.example.hotel.model.response.*;
import com.example.hotel.repository.*;
import com.example.hotel.service.BookingService;
import com.example.hotel.service.mail.MailService;
import com.example.hotel.utils.Utils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingServiceBean implements BookingService {

    final BookingRepository bookingRepository;

    final RoomRepository roomRepository;

    final RoomTypeRepository roomTypeRepository;

    final OrderBookingRepository orderBookingRepository;

    @Autowired
    NativeQueryRepository nativeQueryRepository;

    @Autowired
    MailService mailService;

    public BookingServiceBean(BookingRepository bookingRepository,
                              RoomRepository roomRepository,
                              RoomTypeRepository roomTypeRepository,
                              OrderBookingRepository orderBookingRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.orderBookingRepository = orderBookingRepository;
    }

    @Override
    public int getNumberOfAvailableRooms(BookingCheckRequest bookingCheckRequest) throws BookingBusinessException {

        int numberOfAvailableRoom = 0;

        List<RoomType> roomTypeList = roomTypeRepository.findAll();

        if (!isValidRoomTypeId(bookingCheckRequest, roomTypeList)) {
            throw new BookingBusinessException("Invalid Room Type Id");
        }

        List<Booking> bookingList = bookingRepository.getListBookingByDate(
                bookingCheckRequest.getInputCheckinDate(),
                bookingCheckRequest.getInputCheckoutDate(),
                bookingCheckRequest.getRoomTypeId());

        LocalDate requestCheckInDate = bookingCheckRequest.getInputCheckinDate();
        LocalDate requestCheckOutDate = bookingCheckRequest.getInputCheckoutDate();

        Map<LocalDate, Integer> dateStatusMap = new HashMap<LocalDate, Integer>();

        for (Booking booking : bookingList) {
            LocalDate checkInDate = booking.getCheckInDate();
            LocalDate checkOutDate = booking.getCheckOutDate();

            LocalDate startDate = checkInDate.compareTo(requestCheckInDate) <= 0 ? requestCheckInDate : checkInDate;
            LocalDate endDate =  checkOutDate.compareTo(requestCheckOutDate) <= 0 ? checkOutDate : requestCheckOutDate;

            List<LocalDate> dateList = startDate.datesUntil(endDate.plusDays(1)).collect(Collectors.toList());

            for (LocalDate date : dateList) {
                if (dateStatusMap.containsKey(date)){
                    dateStatusMap.put(date, dateStatusMap.get(date) + 1);
                } else {
                    dateStatusMap.put(date, 1);
                }
            }
        }
        int maxValueInMap =  bookingList.size() == 0 ? 0 : (Collections.max(dateStatusMap.values()));
        int maxOrderInDay = roomRepository.findByRoomTypeId(bookingCheckRequest.getRoomTypeId()).size();

        numberOfAvailableRoom = maxOrderInDay - maxValueInMap;
        return numberOfAvailableRoom;
    }

    @Override
    @Transactional
    public ResponseEntity<SuccessResponseObj> bookingRooms(OrderRequest orderRequest) throws BookingBusinessException, MessagingException {
        List<RoomType> roomTypeList = roomTypeRepository.findAll();

        for (BookingRequest bookingRequest : orderRequest.getBookingRequestList()) {
            if (!isValidRoomTypeId(bookingRequest, roomTypeList)) {
                throw new BookingBusinessException("Invalid Room Type Id");
            }
        }

        OrderBooking orderBooking = OrderBooking.builder()
                .customerName(orderRequest.getCustomerName())
                .email(orderRequest.getEmail())
                .phoneNumber(orderRequest.getPhoneNumber())
                .build();

        OrderBooking createdOrderBooking = orderBookingRepository.save(orderBooking);

        for (BookingRequest bookingRequest : orderRequest.getBookingRequestList()) {
            Long bookingAmount = bookingRequest.getAmount();
            for(int i = 0; i < bookingAmount; i++) {
                Booking booking = Booking.builder()
                        .orderBooking(createdOrderBooking)
                        .orderId(createdOrderBooking.getId())
                        .checkInDate(bookingRequest.getInputCheckinDate())
                        .checkOutDate(bookingRequest.getInputCheckoutDate())
                        .roomTypeId(bookingRequest.getRoomTypeId())
                        .status(BookingStatus.ORDERED).build();
                bookingRepository.save(booking);
            }
        }

        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Booking Successfully").build();

        GeneralRequest request = new GeneralRequest();
        request.setType("order");
        request.setData(orderRequest);
        mailService.sendSimpleEmail(request);
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }

    @Override
    public BookingCountResponse getBookingCount(String year) {
        List<BookingCountDTO> bookingCountList = nativeQueryRepository.getBookingCount(year);
        BookingCountResponse bookingCountResponse = new BookingCountResponse();
        bookingCountResponse.createResponseList();
        for (BookingCountDTO bookingCountDTO : bookingCountList) {
            CountResponse countResponse = new CountResponse();
            switch (bookingCountDTO.getMonth()) {
                case "January":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("January"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "February":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("February"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "March":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("March"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "April":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("April"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "May":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("May"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "June":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("June"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "July":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("July"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "August":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("August"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "September":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("September"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "October":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("October"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "November":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("November"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
                case "December":
                    BeanUtils.copyProperties(bookingCountDTO, countResponse);
                    bookingCountResponse.getBookingCountResponseList().stream()
                            .filter(bookingInMonthResponse -> bookingInMonthResponse.getMonth().equals("December"))
                            .findFirst().ifPresent(booking -> booking.getBookingCountList().add(countResponse));
                    break;
            }
        }
        return bookingCountResponse;
    }

    @Override
    public List<IncomeInMonthResponse> getIncomeInMonths(String year) {
        List<IncomeCountDTO> incomeCountDTOList = nativeQueryRepository.getIncomeCount(year);
        List<IncomeInMonthResponse> incomeInMonthResponseList = new ArrayList<>();
        BigDecimal income;
        for (IncomeCountDTO incomeCountDTO : incomeCountDTOList) {
            IncomeInMonthResponse existingInComeInMonthResponse = getExistingInComeInMonthResponse(incomeInMonthResponseList, incomeCountDTO.getMonth());
            RoomType roomType = roomTypeRepository.findById(incomeCountDTO.getRoom_type_id()).orElseThrow();

            if(existingInComeInMonthResponse != null) {
                income = roomType.getPrice().multiply(BigDecimal.valueOf(incomeCountDTO.getBooking_count()))
                        .add(existingInComeInMonthResponse.getIncome());
                existingInComeInMonthResponse.setIncome(income);
            } else {
                IncomeInMonthResponse incomeInMonthResponse = new IncomeInMonthResponse(incomeCountDTO.getMonth(), BigDecimal.valueOf(0));
                income = roomType.getPrice().multiply(BigDecimal.valueOf(incomeCountDTO.getBooking_count()))
                        .add(incomeInMonthResponse.getIncome());
                incomeInMonthResponse.setIncome(income);
                incomeInMonthResponseList.add(incomeInMonthResponse);
            }
        }
        return incomeInMonthResponseList;
    }

    private IncomeInMonthResponse getExistingInComeInMonthResponse(List<IncomeInMonthResponse> incomeInMonthResponseList, String month) {
        return incomeInMonthResponseList.stream().
                filter(incomeInMonthResponse -> incomeInMonthResponse.getMonth().equals(month))
                .findFirst().orElse(null);
    }

    public Boolean isValidRoomTypeId(Object requestObject, List<RoomType> roomTypeList){
        Long roomTypeId = Utils.getRoomTypeId(requestObject);
        return roomTypeList.stream().anyMatch(roomType -> roomType.getId().equals(roomTypeId));
    }

}

package com.example.hotel.controller;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.model.request.BookingCheckRequest;
import com.example.hotel.model.request.ContactRequest;
import com.example.hotel.model.request.RoomRequest;
import com.example.hotel.model.response.SuccessResponseObj;
import com.example.hotel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactController {

    @Autowired
    UserService userService;

    @PostMapping("/send")
    public ResponseEntity<SuccessResponseObj> sendContact(@Valid @RequestBody ContactRequest contactRequest) throws MessagingException {
        return userService.sendContact(contactRequest);
    }
}

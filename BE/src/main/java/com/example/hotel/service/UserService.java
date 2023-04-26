package com.example.hotel.service;

import com.example.hotel.model.request.ContactRequest;
import com.example.hotel.model.response.SuccessResponseObj;
import org.springframework.http.ResponseEntity;

import javax.mail.MessagingException;

public interface UserService {
    ResponseEntity<SuccessResponseObj> sendContact(ContactRequest contactRequest) throws MessagingException;
}

package com.example.hotel.service.serviceImp;

import com.example.hotel.model.entity.Contact;
import com.example.hotel.model.request.ContactRequest;
import com.example.hotel.model.request.GeneralRequest;
import com.example.hotel.model.response.SuccessResponseObj;
import com.example.hotel.repository.ContactRepository;
import com.example.hotel.service.UserService;
import com.example.hotel.service.mail.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Service
public class UserServiceBean implements UserService {

    @Autowired
    ContactRepository contactRepository;

    @Autowired
    MailService mailService;

    @Override
    public ResponseEntity<SuccessResponseObj> sendContact(ContactRequest contactRequest) throws MessagingException {
        Contact contact = Contact.builder()
                .name(contactRequest.getName())
                .email(contactRequest.getEmail())
                .phone(contactRequest.getPhone())
                .subject(contactRequest.getSubject())
                .message(contactRequest.getMessage())
                .build();
        contactRepository.save(contact);
        SuccessResponseObj successResponseObj = SuccessResponseObj.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Send contact Successfully").build();
        GeneralRequest request = new GeneralRequest();
        request.setType("contact");
        request.setData(contactRequest);
        mailService.sendSimpleEmail(request);
        return new ResponseEntity<>(successResponseObj, HttpStatus.OK);
    }
}

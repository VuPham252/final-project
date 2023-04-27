package com.example.hotel.service.mail;

import com.example.hotel.model.request.ContactRequest;
import com.example.hotel.model.request.GeneralRequest;
import com.example.hotel.model.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import java.util.concurrent.CompletableFuture;

@Service
public class MailService {
    @Autowired
    public JavaMailSender emailSender;

    @Autowired
    ThymeleafService thymeleafService;

    private static final String CONTENT_TYPE_TEXT_HTML = "text/html;charset=\"utf-8\"";
    private static final String BOOKING_SUBJECT = "[TOOR Hotel] - BOOKING SUCCESSFULLY";
    private static final String CONTACT_SUBJECT = "[TOOR Hotel] - INFORMATION RECEIVED";

    @Async("threadPoolTaskExecutor")
    public CompletableFuture sendSimpleEmail(GeneralRequest request) throws MessagingException {
        MimeMessage mess = this.emailSender.createMimeMessage();
        switch (request.getType()) {
            case "order":
                OrderRequest orderRequest = (OrderRequest) request.getData();

                mess.setRecipients(MimeMessage.RecipientType.TO, orderRequest.getEmail());
                mess.setSubject(BOOKING_SUBJECT);
                mess.setContent(thymeleafService.getContent(request), CONTENT_TYPE_TEXT_HTML);
                this.emailSender.send(mess);
                return CompletableFuture.completedFuture("Email Sent to " + orderRequest.getEmail());

            case "contact":
                ContactRequest contactRequest = (ContactRequest) request.getData();
                mess.setRecipients(MimeMessage.RecipientType.TO, contactRequest.getEmail());
                mess.setSubject(CONTACT_SUBJECT);
                mess.setContent(thymeleafService.getContent(request), CONTENT_TYPE_TEXT_HTML);
                this.emailSender.send(mess);
                return CompletableFuture.completedFuture("Email Sent to " + contactRequest.getEmail());
        }
        return null;
    }

}

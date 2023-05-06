package com.example.hotel.service.mail;

import com.example.hotel.exception.SystemErrorException;
import com.example.hotel.model.request.BookingRequest;
import com.example.hotel.model.request.ContactRequest;
import com.example.hotel.model.request.GeneralRequest;
import com.example.hotel.model.request.OrderRequest;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

@Service
public class ThymeleafService {
    private static final String MAIL_TEMPLATE_BASE_NAME = "mail/MailMessages";
    private static final String MAIL_TEMPLATE_PREFIX = "/templates/";
    private static final String MAIL_TEMPLATE_SUFFIX = ".html";
    private static final String UTF_8 = "UTF-8";

    private static final String MAIL_TEMPLATE = "mail-template";
    private static final String NOTIFY_TEMPLATE = "notify-template";

    private static TemplateEngine templateEngine;

    static {
        templateEngine = emailTemplateEngine();
    }

    private static TemplateEngine emailTemplateEngine() {
        final SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(htmlTemplateResolver());
        templateEngine.setTemplateEngineMessageSource(emailMessageSource());
        return templateEngine;
    }

    private static ResourceBundleMessageSource emailMessageSource() {
        final ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename(MAIL_TEMPLATE_BASE_NAME);
        return messageSource;
    }

    private static ITemplateResolver htmlTemplateResolver() {
        final ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix(MAIL_TEMPLATE_PREFIX);
        templateResolver.setSuffix(MAIL_TEMPLATE_SUFFIX);
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateResolver.setCharacterEncoding(UTF_8);
        templateResolver.setCacheable(false);
        return templateResolver;
    }

    public String getContent(GeneralRequest request) {
        final Context context = new Context();
        try{
            switch (request.getType()) {
                case "contact":
                    ContactRequest contactRequest = (ContactRequest) request.getData();
                    context.setVariable("name", contactRequest.getName());
                    return templateEngine.process(NOTIFY_TEMPLATE, context);

                case "order":
                    OrderRequest orderRequest = (OrderRequest) request.getData();
                    context.setVariable("name", orderRequest.getCustomerName());
                    context.setVariable("bookingRequestList", orderRequest.getBookingRequestList());
                    Double subTotal = 0d;
                    for (BookingRequest bookingRequest : orderRequest.getBookingRequestList()) {
                        subTotal += bookingRequest.getRoomTypePrice() * bookingRequest.getAmount();
                    }
                    Double tax = subTotal * 0.1;
                    context.setVariable("subTotal", subTotal);
                    context.setVariable("tax", tax);
                    return templateEngine.process(MAIL_TEMPLATE, context);
            }
        }catch (Exception e) {
            throw e;
        }
        return null;
    }
}

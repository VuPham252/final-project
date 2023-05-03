package com.example.hotel.controller;

import com.example.hotel.exception.BookingBusinessException;
import com.example.hotel.exception.SystemErrorException;
import com.example.hotel.model.response.BlogResponse;
import com.example.hotel.model.response.RoomTypeResponse;
import com.example.hotel.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "api/v1/blog")
public class BlogController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/all")
    public List<BlogResponse> getAllBlog() throws IOException {
        return adminService.getAllBlog();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getBlogId(@PathVariable("id") Long id) throws SystemErrorException, IOException {
        BlogResponse blogResponse = adminService.getBlogById(id);
        return new ResponseEntity<>(blogResponse, HttpStatus.OK);
    }
}

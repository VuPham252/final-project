package com.example.hotel.model.response;

import lombok.Data;

@Data
public class FileUploadResponse {
    private String fileName;
    private String downloadUri;
    private String fileCode;
    private long size;
}

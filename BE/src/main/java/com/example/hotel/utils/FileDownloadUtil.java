package com.example.hotel.utils;

import org.apache.commons.io.FileUtils;
import org.springframework.core.io.UrlResource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import org.springframework.core.io.Resource;

public class FileDownloadUtil {
    private static Path foundFile;

    public Resource getFileAsResource(String fileCode) throws IOException {
        Path dirPath = Paths.get("Files-Upload");

        Files.list(dirPath).forEach(file -> {
            if (file.getFileName().toString().startsWith(fileCode)) {
                foundFile = file;
                return;
            }
        });

        byte[] fileContent = FileUtils.readFileToByteArray(new File(String.valueOf(foundFile)));
        String encodedString = Base64.getEncoder().encodeToString(fileContent);

        if (foundFile != null) {
            UrlResource url = new UrlResource(foundFile.toUri());
            return new UrlResource(foundFile.toUri());
        }

        return null;
    }

    public static String getFilePath(String fileCode) throws  IOException {
        Path dirPath = Paths.get("Files-Upload");

        Files.list(dirPath).forEach(file -> {
            if (file.getFileName().toString().startsWith(fileCode)) {
                foundFile = file;
                return;
            }
        });
        return new File(String.valueOf(foundFile)).toString();
    }

    public static String encodeImg(Path foundFile) throws IOException {
        byte[] fileContent = FileUtils.readFileToByteArray(new File(String.valueOf(foundFile)));
        return Base64.getEncoder().encodeToString(fileContent);
    }
}

package com.example.hotel.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class FileUtil {
    public static void deleteFile(List<String> fileCodeList) throws IOException {
        Path dirPath = Paths.get("Files-Upload");


        for (String fileCode : fileCodeList) {
            Files.list(dirPath).forEach(file -> {
                if (file.getFileName().toString().startsWith(fileCode)) {
                    try {
                        Files.deleteIfExists(
                                Paths.get(file.toAbsolutePath().toString()));
                    } catch (NoSuchFileException e) {
                        System.out.println(
                                "No such file/directory exists");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            });
        }

    }


}

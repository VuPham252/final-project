package com.example.hotel.utils;

import com.example.hotel.model.entity.Image;

import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Utils {

    private static List<String> getFieldNames(Field[] fields) {
        List<String> fieldNames = new ArrayList<>();
        for (Field field : fields)
            fieldNames.add(field.getName());
        return fieldNames;
    }

    public static Long getRoomTypeId(Object o) {
        try {
            Field field = o.getClass().getDeclaredField("roomTypeId");
            field.setAccessible(true);
            Long roomTypeId = Long.parseLong(field.get(o).toString());
            return roomTypeId;
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static List<String> createImgEncodeString(List<Image> imageList) throws IOException {
        List<String> encodedStringList = new ArrayList<>();
        for (Image image : imageList) {
            String encodeString = FileDownloadUtil.encodeImg(Paths.get(image.getFilePath()));
            encodedStringList.add(encodeString);
        }
        return  encodedStringList;
    }

    public static List<String> getImgFileCode(List<Image> imageList) throws IOException {
        List<String> imgFileCodeList = new ArrayList<>();
        for (Image image : imageList) {
            imgFileCodeList.add(image.getFileCode());
        }
        return  imgFileCodeList;
    }
}

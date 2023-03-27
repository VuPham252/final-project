package com.example.hotel.utils;

import java.lang.reflect.Field;
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
}

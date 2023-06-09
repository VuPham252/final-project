package com.example.hotel;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@SpringBootApplication
@EnableAsync
public class HotelApplication implements CommandLineRunner {

    public static Integer k = 0;

    public static void main(String[] args) {
        SpringApplication.run(HotelApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {


        String startDate_string = "2023-03-22";
        String stopDate_string = "2023-03-22";
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDateStart = LocalDate.parse(startDate_string, dtf);
        LocalDate localDateEnd = LocalDate.parse(stopDate_string, dtf);

//        long numOfDaysBetween = ChronoUnit.DAYS.between(localDateStart, localDateEnd);
//        List<LocalDate> dataList = IntStream.iterate(0, i -> i + 1)
//                .limit(numOfDaysBetween)
//                .mapToObj(i -> localDateStart.plusDays(i))
//                .collect(Collectors.toList());
//        List<LocalDate> dateList = localDateStart.datesUntil(localDateEnd.plusDays(1)).collect(Collectors.toList());
//        System.out.println(dateList);

//        Increment obj = new Increment();
//        T1 t1 = new T1(obj);
//        T2 t2 = new T2(obj);
//
//        t1.start();
//        t2.start();
//        int r =t1.result + t2.result;
//        System.out.println(k);
//        try {
//            t1.join();
//            t2.join();
//            int r = t1.result + t2.result;
//        }catch (Exception e) {
//            e.printStackTrace();
//        }
//        System.out.println(k);

    }
}

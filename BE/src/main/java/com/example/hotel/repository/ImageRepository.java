package com.example.hotel.repository;

import com.example.hotel.model.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {

    @Modifying
    @Query("delete from Image i where i.fileCode in ?1")
    void deleteByFileCodeIn(List<String> fileCode);
}

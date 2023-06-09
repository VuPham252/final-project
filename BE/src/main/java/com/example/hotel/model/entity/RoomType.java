package com.example.hotel.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="room_type")
public class RoomType {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String typeName;

    private BigDecimal price;

    private Double size;

    private Double area;

    private String layout;

    private String extraService;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "roomType", cascade = CascadeType.ALL)
    private List<Image> imageList;

    @Lob
    private String shortDescription;

    @Lob
    private String description;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @UpdateTimestamp
    private LocalDateTime updatedTime;
}

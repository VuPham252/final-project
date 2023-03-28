package com.example.hotel.repository;

import com.example.hotel.model.entity.Role;
import com.example.hotel.model.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

package com.example.crud.domain.client;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, String> {
    List<Client> findAllByActiveTrue();
    List<Client> findAllByActiveFalse();
}
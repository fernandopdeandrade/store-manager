package com.example.crud.domain.sold;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface SoldRepository extends JpaRepository<Sold, String> {
  List<Sold> findAll();
}

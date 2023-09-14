package com.example.crud.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.domain.sold.RequestSold;
import com.example.crud.domain.sold.Sold;
import com.example.crud.domain.sold.SoldRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sold")
public class SoldController {
  @Autowired
  private SoldRepository repository;

  @PostMapping
  public ResponseEntity<Sold> registerSold(@RequestBody @Valid RequestSold data) {
    try {
      Sold newSold = new Sold(data);
      repository.save(newSold);
      return ResponseEntity.ok(newSold);
    } catch (Exception e) {
      throw new IllegalArgumentException();
    }
  }
}

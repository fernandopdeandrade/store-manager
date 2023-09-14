package com.example.crud.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

  /**
   * Register a new sold
   */
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

  /**
   * Get all solds
   */
  @GetMapping
  public ResponseEntity<List<Sold>> getAllSolds() {
    try {
      var allSolds = repository.findAll();
      return ResponseEntity.ok(allSolds);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  /**
   * Get all solds by client id
   */
  @GetMapping("/{id}")
  public ResponseEntity<List<Sold>> getClientById(@PathVariable String id) {
    List<Sold> solds = new ArrayList<Sold>();

    try {
      var allSolds = repository.findAll();

      for (Sold sold : allSolds) {
        if (sold.getIdClient().equals(id)) {
          solds.add(sold);
        }
      }
      
      return ResponseEntity.ok(solds);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }
}

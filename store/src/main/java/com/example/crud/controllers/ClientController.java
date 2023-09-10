package com.example.crud.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.domain.client.Client;
import com.example.crud.domain.client.ClientRepository;
import com.example.crud.domain.client.RequestCliente;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/client")
public class ClientController {
  @Autowired
  private ClientRepository repository;

  @GetMapping
  public ResponseEntity<List<Client>> getAllClients() {
    try {
      var allClients = repository.findAllByActiveTrue();
      return ResponseEntity.ok(allClients);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<Client> getClientById(@PathVariable String id) {
      Optional<Client> optionalClient = repository.findById(id);
      if (optionalClient.isPresent()) {
          Client client = optionalClient.get();
          return ResponseEntity.ok(client);
      } else {
          throw new EntityNotFoundException();
      }
    }

  @PostMapping
  public ResponseEntity<Client> registerClient(@RequestBody @Valid RequestCliente data) {
    boolean clientExists = false;
    var allClients = repository.findAllByActiveTrue();

    for (Client client : allClients) {
      if (client.getName() == data.name() && client.getCpf().equals(data.cpf())) {
        clientExists = true;
      }
    }

    if (clientExists) {
      throw new IllegalArgumentException();
    } else {
      Client newClient = new Client(data);
      repository.save(newClient);
      return ResponseEntity.ok(newClient);
    }
  }
    
  @PutMapping
  @Transactional
  public ResponseEntity<Client> updateClient(@RequestBody @Valid RequestCliente data) {
    Optional<Client> optionalClient = repository.findById(data.id());
    if (optionalClient.isPresent()) {
      Client Client = optionalClient.get();
      Client.setName(data.name());
      Client.setCpf(data.cpf());
      Client.setEmail(data.email());
      Client.setBirth_date(data.birth_date());
      Client.setId_product(data.id_product());
      return ResponseEntity.ok(Client);
    } else {
      throw new EntityNotFoundException();
    }
  }
    
  @PutMapping("/desative/{id}")
  @Transactional
  public ResponseEntity<Client> desativeClient(@PathVariable String id) {
    Optional<Client> optionalClient = repository.findById(id);
    if (optionalClient.isPresent()) {
      Client client = optionalClient.get();
      client.setActive(false);
      return ResponseEntity.noContent().build();
    } else {
      throw new EntityNotFoundException();
    }
  }
  
  @PutMapping("/active/{id}")
  @Transactional
  public ResponseEntity<Client> activeClient(@PathVariable String id) {
      Optional<Client> optionalClient = repository.findById(id);
      if (optionalClient.isPresent()) {
          Client client = optionalClient.get();
          client.setActive(true);
          return ResponseEntity.noContent().build();
      } else {
          throw new EntityNotFoundException();
      }
  }
    
  @DeleteMapping("/delete/{id}")
  @Transactional
  public ResponseEntity<Client> deleteClient(@PathVariable String id){
      Optional<Client> optionalClient = repository.findById(id);
      if (optionalClient.isPresent()) {
          Client client = optionalClient.get();
          repository.delete(client);
          return ResponseEntity.noContent().build();
      } else {
          throw new EntityNotFoundException();
      }
  }
}

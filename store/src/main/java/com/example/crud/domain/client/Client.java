package com.example.crud.domain.client;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="client")
@Entity(name="client")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Client {
  @Id @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  private String name;
  private String cpf;
  private String email;
  private String birth_date;
  private String id_product;
  private Boolean active;
  
  public Client(RequestCliente requestCliente) {
    this.name = requestCliente.name();
    this.cpf = requestCliente.cpf();
    this.email = requestCliente.email();
    this.birth_date = requestCliente.birth_date();
    this.id_product = requestCliente.id_product();
    this.active = true;
  }
}

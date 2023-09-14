package com.example.crud.domain.sold;

import jakarta.persistence.Column;
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

@Table(name="sold")
@Entity(name="sold")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Sold {
  @Id @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(name="id_product")
  private String idProduct;

  @Column(name="id_client")
  private String idClient;

  public Sold(RequestSold requestSold) {
    this.idProduct = requestSold.idProduct();
    this.idClient = requestSold.idClient();
  }
}

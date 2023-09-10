package com.example.crud.domain.client;

import jakarta.validation.constraints.NotBlank;

public record RequestCliente(
  String id,

  @NotBlank
  String name,
  @NotBlank
  String cpf,
  @NotBlank
  String email,
  @NotBlank
  String birth_date,

  String id_product
) {  
}

package com.example.crud.domain.client;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record RequestCliente(
  String id,

  String name,
  String cpf,
  
  @Email
  String email,

  String birth_date,

  String id_product,
  
  @NotNull
  String password,

  String role
) {  
}

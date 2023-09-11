package com.example.crud.domain.client;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record RequestCliente(
  String id,

  @NotNull
  String name,
  @NotNull
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

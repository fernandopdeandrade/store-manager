CREATE TABLE client (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    cpf TEXT NOT NULL,
    email TEXT NOT NULL,
    birth_date TEXT NOT NULL,
    id_product TEXT NOT NULL
);
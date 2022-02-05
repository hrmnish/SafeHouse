CREATE DATABASE safehouse;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),    --To make this work download extension in psql "create extention if not exists "uuid-oops""
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);
CREATE extension IF NOT EXISTS "uuid-ossp";

DROP TABLE users, letters, responses;

CREATE TABLE IF NOT EXISTS users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS letters(
  letter_id uuid DEFAULT uuid_generate_v4(),
  sender_id uuid NOT NULL,
  letter VARCHAR(511) DEFAULT ' ',
  responses INT DEFAULT 0,
  recievable BOOLEAN DEFAULT TRUE,
  send_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY(letter_id),
  FOREIGN KEY (sender_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS responses(
  response_id uuid DEFAULT uuid_generate_v4(),
  letter_id uuid NOT NULL,
  sender_id uuid NOT NULL,
  response VARCHAR(511) DEFAULT ' ',
  send_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY(response_id),
  FOREIGN KEY (letter_id) REFERENCES letters(letter_id),
  FOREIGN KEY (sender_id) REFERENCES users(user_id)
);
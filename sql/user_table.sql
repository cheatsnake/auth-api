create TABLE user_table(
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) UNIQUE NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    is_activated BOOLEAN NOT NULL,
    activation_link VARCHAR(256),
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role_table(id)
);
create TABLE token_table(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    refresh_token VARCHAR(256) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user_table(id)
);
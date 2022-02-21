create TABLE role_table(
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) UNIQUE
);

INSERT INTO role_table (name) VALUES ('user');

INSERT INTO role_table (name) VALUES ('admin');
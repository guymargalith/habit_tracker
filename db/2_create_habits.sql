CREATE TABLE habits (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    frequency INT NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL
);
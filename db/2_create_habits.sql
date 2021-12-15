CREATE TABLE habits (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    frequency INT NOT NULL CHECK(frequency < 8 AND frequency > 0),
    user_id INT REFERENCES users(id) NOT NULL
);
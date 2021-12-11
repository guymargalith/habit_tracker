CREATE TABLE logs (
    id serial PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    habit_id INT REFERENCES habits(id) NOT NULL
);
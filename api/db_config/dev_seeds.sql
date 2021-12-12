INSERT INTO users(username, password_digest)
VALUES
('guymargs', 'password'),
('guymargs2', 'password'),
('guymargs3', 'password'),
('guymargs4', 'password');

INSERT INTO habits(name, frequency, user_id)
VALUES
('habit 1', 3, 1),
('habit 2', 4, 1),
('habit 3', 2, 2),
('habit 4', 1, 3),
('habit 5', 7, 3),
('habit 6', 6, 3),
('habit 7', 3, 4);

INSERT INTO logs(date, habit_id)
VALUES
(1639267200, 1),
(1639180800, 1);
-- (1638748800, 1),
-- (1638316800, 1),
-- (1638230400, 1),
-- (1637798400, 1),
-- (1637712000, 1),
-- (1637625600, 1),
-- (1635724800, 1);

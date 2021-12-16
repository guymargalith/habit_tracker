TRUNCATE users, habits, logs RESTART IDENTITY;

INSERT INTO users (id, username, password_digest) 
VALUES
(1, 'Test User 1', 'Test password 1'),
(2, 'Test User 2', 'Test password 2');

INSERT INTO habits (name, frequency, user_id) 
VALUES
(
    'Test Habit 1', 
    2, 
    1,
    
),
(
    'Test Habit 2',
    4,
    2,
);

INSERT INTO logs (date, habit_id)
VALUES
(2021-12-12, 1),
(2021-12-13, 2);

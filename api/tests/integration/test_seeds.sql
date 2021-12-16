TRUNCATE users, habits, logs RESTART IDENTITY;

INSERT INTO users (username, password_digest) 
VALUES
('Test User 1', 'Testpassword1'),
('Test User 2', 'Testpassword2');

INSERT INTO habits (name, frequency, user_id) 
VALUES
(
    'Test Habit 1', 
    7, 
    1
    
),
(
    'Test Habit 2',
    4,
    2
);

INSERT INTO logs (date, habit_id)
VALUES
(1639267200, 1),
(1639267200, 2);

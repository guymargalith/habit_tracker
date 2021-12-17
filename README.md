# LAP 2 Group Project: Habit Tracker 'TRACKIT!'

### By Peter Andrews-Briscoe, Rhys Cairns, Guy Margalith and Bethan Vaughan

## Assignment Description

This is a group project which asked us to create a site where users can track their habits. The user can choose any habit they would like to track, decide the frequency at which they would like to track this habit, mark it complete for a particular day and view their progress via weekly streaks. The user is also able to edit and delete any particular habit. The website consists of a homepage where users can register or log in, a log in page which, upon successful log in credentials, takes them to their personalised habits page.

## Installation & Usage

- To clone the project into your local machine, type `git clone` followed by the SSH key into the command line
- To run the code, type `bash _scripts/startDev.sh`
- To run the server-side tests, type `bash _scripts/startDev.sh`
- To run the client-side tests, cd into client folder and type `npm test`
- To stop all services, type `bash _scripts/teardown.sh`

## Technologies

- HTML/CSS
- JavaScript
- Bootstrap
- SQL
- Node / Express.js
- Jest / Coverage / Supertest
- Browserify / Watchify
- Bcrypt
- Netlify
- Heroku
- Nodemon
- Cors
- Docker

## Issues and Challenges

We experienced several small issues during the project. We had difficulty with the logging system, rendering of the pages using a single html page, and the live updates.

## Future Features

- Personalised user page
- Graph allowing the user to visualise and track their habit history and progress
- Reminder notifications
- Messages of encouragement/praise after particular milestones
- Social component allowing the user to connect with friends/other users

## Files

## CLIENT

### auth.js

### content.js

### layout.js

### requests.js

### style.css

### index.html

## Tests (client)

## SERVER

## Controllers:

### auth.js

### habits.js

### logs.js

### users.js

## db_config:

### dev_seeds.sql

### init.js

### seedDev.js

## middleware:

### auth.js

## models:

### Habit.js

### Log.js

### User.js

## Tests (server)

### index.js

### server.js

## DB

### 1_create_users.sql

### 2_create_habits.sql

### 3_create_logs.sql

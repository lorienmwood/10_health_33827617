# Fitness Tracking Application - Gym app

A small web application built using Node.js, Express.js, and the EJS templating engine.

## Technologies Used

- Express.js – for handling web requests/routes
- Node.js – to run the server
- EJS - for dynamic HTML templates
- HTML – for the webpages

## How to Install and Run Locally

1. Clone the Github

```
git clone https://github.com/lorienmwood/10_health_33827617.git
cd 10_health_33827617
```

2. Install Node.js

```
npm install
```

3. Run the Server

```
node index.js
```

4. Open the Browser \
   Visit http://localhost:8000/ and the webpage will open.

## Routes

| Route           | Description                                      |
| --------------- | ------------------------------------------------ |
| /               | Home page displaying other pages                 |
| / about         | About the website                                |
| / add           | Add workouts                                     |
| / addexercise   | Add exercises                                    |
| / login         | Login page                                       |
| / loggedin      | When user logged in                              |
| / register      | Register first name,last name and email of users |
| / registered    | Registered users                                 |
| / search        | Search previous workouts                         |
| / searchresults | Page to show results                             |

## dotenv

1. To avoid exposing database credentials in the source code, the application uses the dotenv module.
2. This stores sensitive details like the database host, username, password, and name in a separate .env file that isn’t committed to version control.
3. The variables are loaded at runtime and accessed via process.env, with the .env file added to .gitignore to keep it hidden from GitHub.
4. This helps keep sensitive data secure.

## Access Control
These pages check access and redirect to the login page if the user is not logged in:

/users/logout – only logged-in users can log out.

/exercise/add - the add exercise form is restricted so only logged-in users can add new workouts

/exercises/added – the POST route that actually inserts a new workout into the database is also restricted

/user/profile – the user profile is only shown to logged-in users.


## Task 7: Sanitisation

#### For the register form:

I used express-sanitizer to protect the register form from XSS attacks.

The following fields are sanitised as they may be stored or displayed. This prevents users from injecting HTML or JavaScript into the system:

- First name
- Last name
- Username
- Email

The password field is not sanitised because it is never displayed and is only hashed and stored securely. Sanitising it could change the user’s input and break login without adding extra security.


#### Login form:

- The username field is sanitised to prevent XSS attacks through malicious input.
- The password field is not sanitised because it is never displayed and is only used for secure comparison with the hashed password. Sanitising it could change the input and break authentication.

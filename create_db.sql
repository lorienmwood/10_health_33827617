-- Health Database, Create the Database
CREATE DATABASE IF NOT EXISTS health;
USE health;

--TYPES OF WORKOUTS e.g. Cardio 
-- Workout Types Table, Create Database 
CREATE TABLE IF NOT EXISTS workoutTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
);

-- TYPES OF EXERCISE e.g. Deadlift
-- Exercise Types Table, Create Database
CREATE TABLE IF NOT EXISTS exerciseTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    workoutTypeId INT NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    muscleGroup VARCHAR(100),
);

--CURRENT WORKOUT
-- Workout Table, Create Database
CREATE TABLE IF NOT EXISTS workouts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    workoutTypeId INT NOT NULL,
    workoutDate DATE NOT NULL,
    intensity VARCHAR(20),
    notes TEXT
);
-- Exercises in Each Workout, Create Databse
CREATE TABLE IF NOT EXISTS workoutExercises (
    id INT PRIMARY KEY AUTO_INCREMENT,
    workoutId INT NOT NULL,
    exerciseTypeId INT NOT NULL,
    sets INT,
    repsPerSet INT,
    weightKg DECIMAL(6,2),
    durationInMinutes INT,
    distanceKm DECIMAL(6,2),
    notes TEXT
);

-- USER 
CREATE USER IF NOT EXISTS 'health_app'@'localhost' IDENTIFIED BY 'qwertyuiop';
GRANT ALL PRIVILEGES ON health.* TO 'health_app'@'localhost';

-- User Table, Create Database
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashedPassword VARCHAR(255) NOT NULL,
);
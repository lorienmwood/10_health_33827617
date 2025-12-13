USE health;

-- types of workouts
INSERT INTO workoutTypes (name) VALUES
('Strength Training'),
('Classes'),
('Cardio'),
('Outdoor Activities'),
('Mobility & Recovery');


-- types of exercises 
INSERT INTO exerciseTypes (workoutTypeId, name, muscleGroup) VALUES
(1, 'Back Squat', 'Legs'),
(1, 'Front Squat', 'Legs'),
(1, 'Leg Press', 'Legs'),
(1, 'Bench Press', 'Chest'),
(1, 'Deadlift', 'Back'),
(1, 'Lat Pulldown', 'Back'),
(1, 'Shoulder Press', 'Shoulders'),
(1, 'Bicep Curl', 'Biceps'),
(1, 'Tricep Pushdown', 'Triceps'),

(2, 'Spin Class', 'Legs'),
(2, 'Pilates Reformer', 'Core'),
(2, 'Yoga ', 'Full Body'),
(2, 'HIIT Class', 'Full Body'),
(2, 'BodyPump', 'Full Body'),

(3, 'Treadmill Run', 'Full Body'),
(3, 'StairMaster', 'Legs'),
(3, 'Rowing Machine', 'Full Body'),
(3, 'Exercise Bike', 'Legs'),
(4, 'Hiking', 'Full Body'),
(4, 'Walking', 'Legs'),
(4, 'Trail Running', 'Legs'),
(4, 'Outdoor Cycling', 'Legs'),

(5, 'Hamstring Stretch', 'Legs'),
(5, 'Hip Flexor Stretch', 'Hips'),
(5, 'Lower Back Stretch', 'Back'),
(5, 'Shoulder Mobility', 'Shoulders'),
(5, 'Foam Rolling', 'Full Body');

-- whole workout
INSERT INTO workouts (userId, workoutTypeId, workoutDate, intensity, notes)
VALUES (1, 1, '2025-03-15', 'High', 'Heavy leg session');


-- each exercise in workout 
INSERT INTO workoutExercises
(workoutId, exerciseTypeId, sets, repsPerSet, weightKg, notes)
VALUES
(1, 1, 5, 5, 80.00, 'Heavy back squats'),
(1, 5, 3, 5, 100.00, 'Deadlifts');

-- login details
INSERT INTO users (username, firstName, lastName, email, hashedPassword)
VALUES (
  'gold',
  'Gold',
  'Smiths',
  'gold@email.com',
  '$2b$10$SvZVxWudPr.HxtmD4XNXQetr1wD934cOaGovLSY5T6XJjkkrVnA5u'
);


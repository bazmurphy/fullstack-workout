const express = require('express');

// Workout Controller Functions
const {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');

// import the requireAuth middleware
const requireAuth = require('../middleware/requireAuth');

// this creates an instance of the Router for us
const router = express.Router();

// this will run the requireAuth middleware function before any of the routes/ControllerFunctions below
// this means all of the routes below are now protected by first ensuring the user is Authenticated
// if they are not authenticated then it will never reach the ControllerFunctions
// if they are authenticated then we attach the _id to the request.user object
// and call next() which will fire the appropriate Controller Function
router.use(requireAuth);

// then we attach the handlers to the router

// GET /api/workouts/     Get All Workouts
router.get('/', getAllWorkouts);

// GET /api/workouts/:id     Get A Single Workout
router.get('/:id', getOneWorkout);

// POST /api/workouts     Create A New Workout
router.post('/', createWorkout);

// DELETE /api/workouts/:id     Delete A Workout
router.delete('/:id', deleteWorkout);

// PATCH /api/workouts/:id     Update A Workout
router.patch('/:id', updateWorkout);

module.exports = router;

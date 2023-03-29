const mongoose = require('mongoose');

// we will create a bunch of functions that we can reference inside the router handlers inside the router file
// instead of coding them inside the router file

// we need the Model here because we wil use it in our Controller Functions
const Workout = require('../models/workoutModel');

// !-- THE REQUEST OBJECT NOW HAS AN USER._ID PROPERTY ATTACHED TO IT FROM THE REQUIREAUTH MIDDLEWARE
// !-- THIS USER._ID CAN NOW BE USED IN ANY OF THESE CONTROLLER HANDLER FUNCTIONS

// Get All Workouts
const getAllWorkouts = async (request, response) => {
  // we have access to the request.user._id from the requireAuth middleware attaching it to the request
  const user_id = request.user._id;

  // when requesting all documents, we have to pass in an empty object, if you pass in { reps: 20 } that would find all the documents where the reps: 20
  // we can add on a mongoose sort method where createdAt is -1 which means the latest are at the top
  // with AUTH we add in user_id to only find Documents created by the currently logged in user
  const workouts = await Workout.find({ user_id }).sort({ updatedAt: -1 });
  // console.log('workoutController getAllWorkouts workouts:', workouts);

  // we return a 200 response, and then add on to that a json response with all the workouts
  response.status(200).json(workouts);
};

// Get A Single Workout
const getOneWorkout = async (request, response) => {
  // pull out the id from the parameters
  const { id } = request.params;

  // if the id is invalid it will crash the App
  // so we need to check if the id is a valid id for MongoDB/Mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: `Invalid Object ID: ${id}` });
  }

  const workout = await Workout.findById(id);
  // console.log('workoutController getOneWorkout workout:', workout);

  if (!workout) {
    // we have to return here for early termination
    return response.status(400).json({ error: `No workout found with ID: ${id}` });
  }

  response.status(200).json(workout);
};

// Create A New Workout
const createWorkout = async (request, response) => {
  const { title, load, reps } = request.body;

  // Backend Form Validation(?)
  let emptyFields = [];
  if (!title) {
    emptyFields.push('title');
  }
  if (!Boolean(String(load))) {
    // this is neccessary because the form can submit a number of 0 for No Load
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    console.log(emptyFields);
    return response
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields: emptyFields });
  }

  try {
    // we have access to the request.user._id from the requireAuth middleware attaching it to the request
    const user_id = request.user._id;

    // the model is ASYNCHRONOUS so the handler function needs to be ASYNCHRONOUS so we can AWAIT
    // we use our Workout Model to create a new Document
    // and once the new document is created the response we get back is the new Document that was created along with the ID of that Document
    const workout = await Workout.create({ title, load, reps, user_id });
    // console.log('workoutController createWorkout workout:', workout);

    // we will send back a 200 response, and then we will add on a json response of the document we got back from the line above
    response.status(200).json(workout);
  } catch (error) {
    // we send back a 400 response, and then add on a json response of the error.message
    response.status(400).json({ error: error.message });
  }
};

// Delete A Workout
const deleteWorkout = async (request, response) => {
  // pull out the id from the parameters
  const { id } = request.params;

  // if the id is invalid it will crash the App
  // so we need to check if the id is a valid id for MongoDB/Mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: `Invalid Object ID: ${id}` });
  }

  // in MongoDB the id is _id
  const workout = await Workout.findOneAndDelete({ _id: id });
  // the above returns the response which contains the Document that was Deleted
  // console.log('workoutController deleteWorkout workout:', workout);

  if (!workout) {
    return response.status(400).json({ error: `No workout found with ID: ${id}` });
  }

  response.status(200).json(workout);
};

// Update A Workout
const updateWorkout = async (request, response) => {
  const { title, load, reps } = request.body;

  // Backend Form Validation(?)
  let emptyFields = [];
  if (!title) {
    emptyFields.push('title');
  }
  if (!Boolean(String(load))) {
    // this is neccessary because the form can submit a number of 0 for No Load
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    console.log(emptyFields);
    return response
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields: emptyFields });
  }

  // pull out the id from the parameters
  const { id } = request.params;

  // if the id is invalid it will crash the App
  // so we need to check if the id is a valid id for MongoDB/Mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: `Invalid Object ID: ${id}` });
  }

  // the first parameter is the ID, and the second is the updates to the Document that we want to make
  const workout = await Workout.findOneAndUpdate(
    { _id: id }, // this is the filter
    {
      ...request.body,
    },
    { returnDocument: 'after' } // this is required to return the updated document and not the original document
  );
  // console.log('workoutController updateWorkout workout:', workout);

  if (!workout) {
    return response.status(400).json({ error: `No workout found with ID: ${id}` });
  }

  response.status(200).json(workout);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};

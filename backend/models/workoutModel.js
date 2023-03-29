// Mongoose allows us to create Schemas for our Data in the Database
// MongoDB alone is Schema-less
const mongoose = require('mongoose');

// we will use this function to create a new Schema
const Schema = mongoose.Schema;

// this will create a new Schema
// and we pass in an object where we define this Schema
// the second object is optional, this automatically makes a createdAt and updatedAt on the Document
// the Schema defines the structure of the documents that we send to the Collection
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// the Schema defines the strucutre of a particular document inside our Database

// now we need to make a Model based on the Schema, we give it a name, and we pass in the Schema.
// mongoose automatically creates a Collection based on this name 'Workout' (but it pluralises it).
// we use the Workout Model to interact with the 'Workout' Collection.
// for example: Workout.find() to get all the documents in the Collection
// We use the methods on the Model itself

module.exports = mongoose.model('Workout', workoutSchema);

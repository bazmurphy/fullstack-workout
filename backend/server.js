// dotenv is a package that loads enviroment variables from the .env file into the process.env object which is available to us globally in a nodejs environment
const dotenv = require('dotenv');
// invoke the config() method from dotenv
dotenv.config();
// require('dotenv').config() <-- dotenv documentation way of doing it

const express = require('express');

const cors = require('cors');

// Mongoose is what is known as an ODM Library
// ODM stands for Object Data Modelling
// It wraps MongoDB with an extra layer that allows us to use methods to read and write database Documents
// And it also gives us a way to declare Models and Schemas to ensure a more strict Data Structure
// If we had a Schema for a Blog document we can require it to have a title, body and author, and they must all be strings, and if we tried to save a Blog document to the Database without any of those Mongoose would not let us, so it adds an extra layer of structure that MongoDB alone doesn't give us.
// we will also use Mongoose to connect to the Database
const mongoose = require('mongoose');

// we import all the routes
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware

app.use(cors());

// the only way we can access the json that is sent with the request is using some middleware
// and its built into express, the json method
// any request that comes in, it checks to see if there is a body to the request, and if it does it parses it, and attaches it to the request object, so we can access it in the request handler
app.use(express.json());

// middleware is a fancy name for any code that executes between us getting a request from the server and us sending a response
// we can register global middleware in our app with app.use
// and this function will fire for every request that comes in
// inside we get access to request, response and next
// next runs at the end of the execution of that middleware in order to move onto the next piece of middleware
// if we send a request to / first of all the middleware runs but if we don't use the next function it would never move onto the next app.get() below
app.use((request, response, next) => {
  console.log('Request Received', '-Method:', request.method, '-Path:', request.path);
  next();
});

// Routes
// it grabs all the routes defined in workoutRoutes and uses them on the app
// we want to specify only fire these routes on a SPECIFIC PATH (first parameter)
// when we fire a request to /api/workouts ROUTE then use the workoutRoutes (which become relative)
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// app.get("/", (request, response) => {
//   response.json({message: "a test json response from the root route"})
// });

// Database Connection
// We need to give it our Connection String
// It is asynchronous and therefore returns a Promise
// So we can affix a .then() to run a function when its complete, as well as a .catch() to handle errors (if username/password is not correct for example)

// ATTEMPT AT MONGO MEMORY SERVER WRAPPER with test database and production database:

// async function createMongoMemoryServer() {
//   const { MongoMemoryServer } = require('mongodb-memory-server');
//   const memoryServer = await MongoMemoryServer.create();
//   return await memoryServer.getUri();
// }

// (async () => {
//   const mongoUri =
//     process.env.NODE_ENV === 'test' ? await createMongoMemoryServer() : process.env.MONGO_URI;
mongoose
  .connect(process.env.MONGO_URI) // mongoUri
  .then(() => {
    // We don't want to start accepting Requests until we are connected to the Database
    app.listen(process.env.PORT, () => {
      console.log(`Connected to the Database and listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) =>
    // MongoServerError: bad auth : Authentication failed.
    console.log(error)
  );
// })();

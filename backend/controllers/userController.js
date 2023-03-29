// import the User Model
const User = require('../models/userModel');

// import jsonwebtoken
const jwt = require('jsonwebtoken');

// make a reusable function that will generate the jwtokens for us
// we pass in _id as the argument because it will be part of the payload of the token
const createToken = (_id) => {
  // we call the sign method, and pass in 3 arguments
  // 1 an object which represents the payload on the token
  // 2 the secret string only known to the server
  // 3 some options - such as expiry
  return jwt.sign({ _id: _id }, process.env.JWTSECRET, { expiresIn: '1d' });
};

// Login User
const loginUser = async (request, response) => {
  console.log('loginUser - request.body:', request.body);

  // get the form data from the post request and destructure
  const { email, password } = request.body;

  try {
    // we use our custom Static Method on the User Model and pass it the two arguments we specified, and are returned a user
    const user = await User.login(email, password);

    // create a Json Web Token
    // we need to pass it the _id which is what we just awaited above
    const token = createToken(user._id);

    // if sucessful respond with json of the email and the token
    response.status(200).json({ email, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Signup User
const signupUser = async (request, response) => {
  console.log('signupUser - request.body:', request.body);

  // get the form data from the post request and destructure
  const { email, password } = request.body;

  console.log('signupUser - email:', email, 'password:', password);

  try {
    // we use our custom Static Method on the User Model and pass it the two arguments we specified, and are returned a user
    const user = await User.signup(email, password);

    // create a Json Web Token
    // we need to pass it the _id which is what we just awaited above
    const token = createToken(user._id);

    // if sucessful respond with json of the email and the user document from above
    // response.status(200).json({ email, user });
    // instead of the user we pass back the token to the client
    // the token is the 3 separate strings bunched together, the header, the payload and the secret all encoded
    response.status(200).json({ email, token });
  } catch (error) {
    // return the message from the error object
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};

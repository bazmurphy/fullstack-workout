// we need this to check the token has not been tampered with
const jwt = require('jsonwebtoken');

// we need this to compare the user from the token with the user in our Database
const User = require('../models/userModel');

// We need to check if the Request came with a JSON Web Token in the Header
// And then we need to check if that Token is Valid
const requireAuth = async (request, response, next) => {
  // We verify if the User is Authenticated
  // We can use the "authorisation" property from the request headers
  const authorization = request.headers.authorization;
  // more elegant destructured way:
  // const { authorization } = request.headers;
  console.log('requireAuth - authorization:', authorization);

  // check if the authorization exists on the
  if (!authorization) {
    return response.status(401).json({ error: 'Authorization token required' });
  }

  // the authorization is in this format "Bearer ~token~" so we need to extract the second part
  const token = authorization.split(' ')[1];

  console.log('requireAuth - token:', token);

  try {
    // the verify method takes in the token and the JTWSECRET from enviroment variables so it can verify
    // it returns the payload from that token, we can then grab the _id from that token
    const { _id } = jwt.verify(token, process.env.JWTSECRET);

    // we can use this _id from the payload to find the User in the Database
    // the .select method gets us a slimmed down Document with only the _id on it, because we don't need to attach anything else

    // we attach the "user" property to the request
    // so that when we go onto the next piece of Middleware like one of the Controller Handler Functions
    // on the request object we will have the user property because we are attaching it in this function which runs first
    // and on that user property we will have an _id property that we can use in the other Controller Handler Functions
    request.user = await User.findOne({ _id }).select('_id');

    // this will then fire the next Handler Function
    next();
  } catch (error) {
    console.log('requireAuth error:', error);
    response.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;

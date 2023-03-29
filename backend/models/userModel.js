const mongoose = require('mongoose');

// validator for emails and passwords
const validator = require('validator');

// bcrypt will salt and hash the passwords
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // we need the unique property on the email so the accounts are unique
  // if a document already exists in the database with that specific email mongoose will not allow it to be created
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// ---- Static Signup Method
// we can make our own a STATIC METHOD on our User Model (similar to User.find() / User.findOneAndUpdate() )
// we take our Schema, we call "statics", and then whatever we want our method to be called
// we put all of the signup logic in here
// we can call that method whenever we want to Signup a User and store that User in the Database
// !! THIS FUNCTION NEEDS TO BE A REGULAR FUNCTION BECAUSE "this" keyword won't work if it is an ARROW FUNCTION
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  // use the validator package to validate the email
  if (!validator.isEmail(email)) {
    throw Error('The email is not valid');
  }

  // use the validator package to validate the password is strong enough
  if (!validator.isStrongPassword(password)) {
    throw Error(
      'The password must be a mininum of 8 characters long, and contain at least 1 upper case, lower case, number and symbol'
    );
  }

  // we need to use "this" because we don't have access to the User here, because we are exporting it
  // we want to find one by the email
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    // we can't send a response here because we don't have access to it
    // so we will throw an Error and later we will catch it in the userController signup function
    throw Error('That email is already in use');
  }

  // We need to hash the password with bcrypt
  // bcrypt requires us to use "SALT" to hash the password
  // "SALT" is a random string of characters to add to the password before it gets hashed
  // because if two passwords are the same, hackers could password match, but with this the hashes will be different

  // generate a SALT
  // the getSalt method is passed a number of "ROUNDS" the higher the longer it takes to crack
  // but it also takes longer for users to signup, so we need to find a balance
  const salt = await bcrypt.genSalt(8);

  // hash the password and SALT together
  const hash = await bcrypt.hash(password, salt);

  // store that password alongside the email in the Database
  // we use "this" to reference the User Model and then we use the regular mongoose method create() and pass it an object to create a Document in the User Collection
  // create() will return the created document
  const user = await this.create({ email: email, password: hash });

  // finally we need to return this user to use it in the userController signup function
  return user;
};

// --- Static Login Method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  // we need to use "this" because we don't have access to the User here, because we are exporting it
  // we want to find one by the email
  const user = await this.findOne({ email });

  if (!user) {
    // we can't send a response here because we don't have access to it
    // so we will throw an Error and later we will catch it in the userController signup function
    throw Error('Incorrect email');
  }

  // we use bcrypt to compare the plain text password and the hashed password, this returns true/false
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  // if everything is ok, we return the user
  return user;
};

module.exports = mongoose.model('User', userSchema);

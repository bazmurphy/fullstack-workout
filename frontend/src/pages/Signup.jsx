import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // use the Custom Hook useSignup to access the signup function and the two states
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log('Signup - email:', email, 'password:', password);

    // call the signup function from above (asynchronously)
    await signup(email, password);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-heading">Sign Up for an Account...</h2>
        <div className="signup-image-container">
          <img className="signup-image" src="images/dumbbells.png" alt="" />
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-control">
            <label htmlFor="signup-form-email" className="signup-form-label">
              Email
            </label>
            <input
              type="email"
              id="signup-form-email"
              className="signup-form-input"
              placeholder="Enter an email..."
              // value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              data-test="signup-form-email"
            />
          </div>
          <div className="signup-form-control">
            <label htmlFor="signup-form-password" className="signup-form-label">
              Password
            </label>
            <input
              type="password"
              id="signup-form-password"
              className="signup-form-input"
              placeholder="Enter a password..."
              // value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              data-test="signup-form-password"
            />
          </div>
          <button
            disabled={isLoading}
            className="signup-form-button"
            data-test="signup-form-submit"
          >
            {isLoading ? 'Signing Up...' : ' Sign Up'}
          </button>
          {error && (
            <div className="signup-form-error" data-test="signup-form-error">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;

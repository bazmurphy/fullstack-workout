import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // use the Custom Hook useLogin to access the login function and the two states
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log('Login - email:', email, 'password:', password);

    // call the login function from above (asynchronously)
    await login(email, password);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-heading">Log In to your Account...</h2>
        <div className="login-image-container">
          <img className="login-image" src="images/exercise2.png" alt="" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-control">
            <label htmlFor="login-form-email" className="login-form-label">
              Email
            </label>
            <input
              type="email"
              // name=""
              id="login-form-email"
              className="login-form-input"
              placeholder="Enter your email..."
              // value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              data-test="login-form-email"
            />
          </div>
          <div className="login-form-control">
            <label htmlFor="login-form-password" className="login-form-label">
              Password
            </label>
            <input
              type="password"
              // name=""
              id="login-form-password"
              className="login-form-input"
              placeholder="Enter your password..."
              // value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              data-test="login-form-password"
            />
          </div>
          <button disabled={isLoading} className="login-form-button" data-test="login-form-submit">
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
          {error && (
            <div className="login-form-error" data-test="login-form-error">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

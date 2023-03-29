import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // get the dispatch function from the useAuthContext Custom Hook
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    // update the loading state to be true
    setIsLoading(true);
    // clear the Error state
    setError(null);

    // console.log('useLogin - email:', email, 'password:', password);

    // we send a POST Request to the API using the Login Form Data
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    });

    // console.log('useLogin - response:', response);

    // this will either return the JSON Web Token or an Error Message
    const json = await response.json();

    // console.log('useLogin - json:', json);

    if (!response.ok) {
      // if the response is not ok, then:
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // take the json object { email, token} we get back from the API
      // and store it in the Local Storage of the Client's Browser
      // We convert it back to JSON to store it inside LocalStorage
      localStorage.setItem('user', JSON.stringify(json));

      // we want to update the Auth Context with the User we get back
      dispatch({ type: 'LOGIN', payload: json });

      // update the loading state to be false
      setIsLoading(false);
    }
  };

  // we return these three things from the Custom Hook
  return { login, error, isLoading };
};

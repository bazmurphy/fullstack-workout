import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // get the dispatch function from the useAuthContext Custom Hook
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    // update the loading state to be true
    setIsLoading(true);
    // clear the Error state
    setError(null);

    // console.log('useSignup - email:', email, 'password:', password);

    // we send a POST Request to the API using the Signup Form Data
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    });

    // console.log('useSignup - response:', response);

    // this will either return the JSON Web Token or an Error Message
    const json = await response.json();

    // console.log('useSignup - json:', json);

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
  return { signup, error, isLoading };
};

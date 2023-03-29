import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // console.log('authReducer - case LOGIN - action.payload:', action.payload);
      // we return a new piece of state which is an object with user: action.payload
      // because the payload is what we will recieve from the server/backend
      return { user: action.payload };
    case 'LOGOUT':
      // console.log('authReducer - case LOGOUT');
      // we return a new piece of state which is an object with user: null to reset it back to the initial state
      return { user: null };
    default:
      // console.log('authReducer - case DEFAULT');
      // if there are no changes return the original state
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // useReducer takes [1] a reducer function, and [2] an initial state (an object with a user key of value null)
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // check upon first load of Application if there is a user object in localStorage
  useEffect(() => {
    // console.log('AuthContext useEffect ran');

    // get the user from localStorage, parse it to a JavaScript Object
    const user = JSON.parse(localStorage.getItem('user'));

    // if there is a user update the Global Auth State
    if (user) {
      console.log('AuthContext useEffect - user object - dispatch function ran');
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  // monitor the AuthContext State as it changes upon login and logout
  console.log('AuthContext State: ', state);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

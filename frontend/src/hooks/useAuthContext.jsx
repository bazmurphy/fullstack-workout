import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// everytime we want to use our Auth Data we just invoke the useAuthContext Hook and get that Context Value back

export const useAuthContext = () => {
  // this returns to us the value of this Context
  // which is the value={} we passed into the .Provider Component
  const context = useContext(AuthContext);

  // this is a sanity check to make sure it is being used within the scope of the Provider
  if (!context) {
    throw Error('useAuthContext must be used inside a AuthContext.Provider');
  }

  return context;
};

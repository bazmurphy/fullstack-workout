import { useContext } from 'react';
import { WorkoutsContext } from '../context/WorkoutsContext';

// everytime we want to use our Workouts Data we just invoke the useWorkoutsContext Hook and get that Context Value back

export const useWorkoutsContext = () => {
  // this returns to us the value of this Context
  // which is the value={} we passed into the .Provider Component
  const context = useContext(WorkoutsContext);

  // this is a sanity check to make sure it is being used within the scope of the Provider
  if (!context) {
    throw Error('useWorkoutsContext must be used inside a WorkoutsContext.Provider');
  }

  return context;
};

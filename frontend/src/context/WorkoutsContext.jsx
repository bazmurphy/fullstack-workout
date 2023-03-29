import { createContext, useReducer } from 'react';

// this is all to keep our LOCAL STATE IN SYNC WITH THE DATABASE

// this creates us a new context
export const WorkoutsContext = createContext();

// this takes in [1] the previous state, [2] the action passed into the dispatch
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    // set all of the workouts
    case 'SET_WORKOUTS':
      // if we want to set all of the workouts the payload would be an array of all of the workouts
      return { workouts: action.payload };
    case 'CREATE_WORKOUT':
      // we first add the new workout, and then spread the previous state workouts
      return { workouts: [action.payload, ...state.workouts] };
    case 'DELETE_WORKOUT':
      // filter out the _id that is to be deleted
      return {
        workouts: state.workouts.filter((workout) => workout._id !== action.payload._id),
      };
    case 'UPDATE_WORKOUT':
      return {
        workouts: [
          // add the updated workout
          action.payload,
          // filter out the old workout by _id
          ...state.workouts.filter((workout) => workout._id !== action.payload._id),
        ],
      };
    default:
      // if the none of the action.types match we just return the state unchanged
      return state;
  }
};

// we provide that Context to our Application Component Tree using the .Provider Component
export const WorkoutsContextProvider = ({ children }) => {
  // useReducer takes [1] a reducer function, and [2] an initial state
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  // monitor the WorkoutsContext State as it changes
  console.log('WorkoutContext State: ', state);

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>{children}</WorkoutsContext.Provider>
  );
};

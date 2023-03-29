import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useLogout = () => {
  // get the dispatch function from useAuthContext Custom Hook
  const { dispatch } = useAuthContext();

  // get the dispatch function from useAuthContext
  // (we need to rename it because we cannot have two variables named the same)
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove user from LocalStorage
    localStorage.removeItem('user');

    // dispatch the logout action.type
    dispatch({ type: 'LOGOUT' });

    // reset the Global State workouts to be null
    workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });
  };

  return { logout };
};

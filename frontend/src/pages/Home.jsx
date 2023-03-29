// import { useState } from "react";
import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import WorkoutCard from '../components/WorkoutCard';
import WorkoutFormAdd from '../components/WorkoutFormAdd';
import WorkoutFormUpdate from '../components/WorkoutFormUpdate';

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);

  // instead of using Local State we are now using Global Context State
  const { state, dispatch } = useWorkoutsContext();

  // we grab the user from the useAuthContext Custom Hook
  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      // this url has to be changed in PRODUCTION to the actual endpoint
      // const response = await fetch('/api/workouts', {
      const response = await fetch('https://fullstack-workout.up.railway.app/api/workouts', {
        // we have to attach headers to the request to authorize access to the endpoint
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // setWorkouts(data);
        dispatch({ type: 'SET_WORKOUTS', payload: data });
      }
    };

    // if we have a value for the user stored in Global State then we try and fetchWorkouts
    if (user) {
      fetchWorkouts();
    }
  }, [user]); // this ideally needs dispatch in the dependencies array

  return (
    <div className="home-page">
      <div className="home-page-workouts-container" data-test="home-page-workouts-container">
        {state.workouts &&
          state.workouts.map((workout, index) => {
            return <WorkoutCard key={workout._id} workout={workout} index={index} />;
          })}
        {state.workouts && !state.workouts.length && (
          <div className="home-page-workouts-empty" data-test="home-page-workouts-empty">
            You have not created any workouts...
          </div>
        )}
      </div>
      <div className="home-page-forms-container">
        <WorkoutFormAdd />
        <WorkoutFormUpdate workouts={state.workouts} />
      </div>
    </div>
  );
};

export default Home;

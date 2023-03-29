import dateFormatter from '../utils/dateFormatter';
import idFormatter from '../utils/idFormatter';
import capitaliseAllWords from '../utils/capitaliseAllWords';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

const WorkoutCard = ({ workout, index }) => {
  // get the dispatch function from Global Context
  const { dispatch } = useWorkoutsContext();

  // we get the user from the Global State AuthContext
  const {
    state: { user },
  } = useAuthContext();

  const [isDeleting, setIsDeleting] = useState(false);

  // if there is no user in Global State AuthContext then we do not allow the request to be sent
  // and early return
  if (!user) {
    return;
  }

  // send a Delete Request to the Backend with the workout id (taken from props)
  const handleClick = async () => {
    setIsDeleting(true);

    // const response = await fetch(`/api/workouts/${workout._id}`, {
    const response = await fetch(
      `https://fullstack-workout.up.railway.app/api/workouts/${workout._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    // console.log('WorkoutCard handleClick response:', response);

    const json = await response.json();

    // console.log('WorkoutCard handleClick json:', json);

    if (!response.ok) {
      setIsDeleting(false);
    }

    if (response.ok) {
      // console.log('Workout Deleted:', json);

      // use the dispatch from the useReducer from Global Context to update the Global State
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
      setIsDeleting(false);
    }
  };

  return (
    <div className="workout-card" data-test="workout-card">
      <div className="workout-card-title-container">
        <p className="workout-card-title-heading">Workout #{index + 1}</p>
        <button
          className="workout-card-delete-button"
          onClick={handleClick}
          data-test="workout-card-delete-button"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <span className="workout-card-delete-icon-active material-symbols-outlined">
              pending
            </span>
          ) : (
            <span className="workout-card-delete-icon-inactive material-symbols-outlined">
              delete
            </span>
          )}
        </button>
      </div>
      <div className="workout-card-subcards-container">
        <div className="workout-card-subcard">
          <div className="workout-card-subcard-image-container">
            <img className="workout-card-subcard-image" src="images/workout.png" alt="" />
          </div>
          <p className="workout-card-title">{capitaliseAllWords(workout.title)}</p>
        </div>
        <div className="workout-card-subcard">
          <div className="workout-card-subcard-image-container">
            <img className="workout-card-subcard-image" src="images/weight-kg.png" alt="" />
          </div>
          <p className="workout-card-load">
            Load: <span className="workout-card-load-value">{workout.load} kg</span>
          </p>
        </div>
        <div className="workout-card-subcard">
          <div className="workout-card-subcard-image-container">
            <img className="workout-card-subcard-image" src="images/yoga.png" alt="" />
          </div>
          <p className="workout-card-reps">
            Reps: <span className="workout-card-reps-value">{workout.reps}</span>
          </p>
        </div>
        <div className="workout-card-database-container">
          <p className="workout-card-database-heading">Database Information:</p>
          <p className="workout-card-created">Created: {dateFormatter(workout.createdAt)}</p>
          <p className="workout-card-updated">Updated: {dateFormatter(workout.updatedAt)}</p>
          <p className="workout-card-id">_id: {idFormatter(workout._id)}</p>
          <p className="workout-card-user-id">user_id: {idFormatter(workout.user_id)}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;

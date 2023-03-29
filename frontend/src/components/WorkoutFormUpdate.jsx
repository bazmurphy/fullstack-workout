import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import capitaliseAllWords from '../utils/capitaliseAllWords';
import idFormatter from '../utils/idFormatter';

const WorkoutFormUpdate = ({ workouts }) => {
  // get the dispatch function for the Reducer from the Global Context
  const { dispatch } = useWorkoutsContext();

  // we get the user from the Global State AuthContext
  const {
    state: { user },
  } = useAuthContext();

  const [workoutId, setWorkoutId] = useState('');
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutLoad, setWorkoutLoad] = useState('');
  const [workoutReps, setWorkoutReps] = useState('');
  const [formError, setFormError] = useState(null);
  const [emptyFormFields, setEmptyFormFields] = useState([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // this handles the selection options
  const handleChange = (event) => {
    // clear the form success message
    setFormSuccess(false);

    // console.log('handleChange event.target.value:', event.target.value);

    if (event.target.value === '') {
      setWorkoutId('');
      setIsUpdating(false);
      return;
    }

    const workout = workouts.find((workout) => workout._id === event.target.value);
    // console.log('handleChange workout:', workout);

    setWorkoutId(workout._id);
    setWorkoutTitle(workout.title);
    setWorkoutLoad(workout.load);
    setWorkoutReps(workout.reps);
  };

  // this handles the form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsUpdating(true);

    // We check if there is a user in Global State AuthContext
    // if there is no user then we do not allow the Form to be submitted
    // we set the error and then early return
    if (!user) {
      setFormError('You must be logged in');
      setIsAdding(false);
      return;
    }

    const workout = {
      // formatted per the Mongoose workoutSchema (/backend/models/workoutModel.js)
      title: workoutTitle,
      load: workoutLoad,
      reps: workoutReps,
    };

    // console.log('WorkoutFormUpdate handleSubmit workout:', workout);

    // the handleSubmit needs to be ASYNC for this
    const response = await fetch(`/api/workouts/${workoutId}`, {
      method: 'PATCH',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    // console.log('WorkoutFormUpdate handleSubmit response:', response);

    const json = await response.json();

    // console.log('WorkoutFormUpdate handleSubmit json:', json);

    if (!response.ok) {
      setFormError(json.error);
      setEmptyFormFields(json.emptyFields);
      setIsUpdating(false);
    }

    if (response.ok) {
      setWorkoutId('');
      setWorkoutTitle('');
      setWorkoutLoad('');
      setWorkoutReps('');
      setFormError(null);
      setEmptyFormFields([]);
      setFormSuccess(true);
      setIsUpdating(false);

      // console.log('Workout Updated', json);

      // we call the dispatch function here and define the type and the payload, which is the response from the Backend upon successful POST to the Database
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="workout-form-update" onSubmit={handleSubmit} data-test="workout-form-update">
      <div className="workout-form-update-title-container">
        <h3 className="workout-form-update-heading">Update a Workout</h3>
        <div className="workout-form-update-image-container">
          <img className="workout-form-update-image" src="images/male-stretch.png" alt="" />
        </div>
      </div>
      <div className="workout-form-update-control">
        <label htmlFor="workout-form-update-select" className="workout-form-update-label">
          Select a Workout:
        </label>
        <select
          name=""
          id="workout-form-update-select"
          value={workoutId}
          onChange={handleChange}
          className="workout-form-update-select"
          data-test="workout-form-update-select"
        >
          <option value="">None</option>
          {workouts &&
            workouts.map((workout, index) => {
              return (
                <option key={workout._id} index={index} value={workout._id}>
                  #{index + 1} {capitaliseAllWords(workout.title)} {idFormatter(workout._id)}
                </option>
              );
            })}
        </select>
      </div>
      {workoutId && (
        <>
          <div className="workout-form-update-control">
            <label htmlFor="workout-form-update-title" className="workout-form-update-label">
              Title
            </label>
            <input
              type="text"
              id="workout-form-update-title"
              placeholder="Enter a workout title..."
              value={workoutTitle}
              onChange={(event) => setWorkoutTitle(event.target.value)}
              className={`workout-form-update-input ${
                emptyFormFields.includes('title') ? 'workout-form-update-empty-field-error' : ''
              }`}
              data-test="workout-form-update-title"
            />
          </div>
          <div className="workout-form-update-control">
            <label htmlFor="workout-form-update-load" className="workout-form-update-label">
              Load
            </label>
            <input
              type="number"
              min="0"
              id="workout-form-update-load"
              placeholder="Enter a load in kg..."
              value={workoutLoad}
              onChange={(event) => setWorkoutLoad(event.target.value)}
              className={`workout-form-update-input ${
                emptyFormFields.includes('load') ? 'workout-form-update-empty-field-error' : ''
              }`}
              data-test="workout-form-update-load"
            />
          </div>
          <div className="workout-form-update-control">
            <label htmlFor="workout-form-update-reps" className="workout-form-update-label">
              Reps
            </label>
            <input
              type="number"
              min="0"
              id="workout-form-update-reps"
              placeholder="Enter a number of reps..."
              value={workoutReps}
              onChange={(event) => setWorkoutReps(event.target.value)}
              className={`workout-form-update-input ${
                emptyFormFields.includes('reps') ? 'workout-form-update-empty-field-error' : ''
              }`}
              data-test="workout-form-update-reps"
            />
          </div>
          <button
            className="workout-form-update-button"
            data-test="workout-form-update-submit"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating Workout...' : 'Update Workout'}
          </button>
          {formError && <div className="workout-form-update-error">{formError}</div>}
        </>
      )}
      {formSuccess && (
        <div className="workout-form-update-success" data-test="workout-form-update-success">
          Successfully Updated Workout!
          <span
            className="workout-form-update-success-close"
            onClick={() => setFormSuccess(false)}
            data-test="workout-form-update-success-close"
          >
            x
          </span>
        </div>
      )}
    </form>
  );
};

export default WorkoutFormUpdate;

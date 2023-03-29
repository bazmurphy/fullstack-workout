import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutFormAdd = () => {
  // get the dispatch function for the Reducer from the Global Context
  const { dispatch } = useWorkoutsContext();

  // we get the user from the Global State AuthContext
  const {
    state: { user },
  } = useAuthContext();

  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutLoad, setWorkoutLoad] = useState('');
  const [workoutReps, setWorkoutReps] = useState('');
  const [formError, setFormError] = useState(null);
  const [emptyFormFields, setEmptyFormFields] = useState([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsAdding(true);

    // reset the form success state
    setFormSuccess(false);

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

    // console.log('WorkoutFormAdd handleSubmit workout:', workout);

    // the handleSubmit needs to be ASYNC for this
    // const response = await fetch('/api/workouts', {
    const response = await fetch('https://fullstack-workout.up.railway.app/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    // console.log('WorkoutFormAdd handleSubmit response:', response);

    const json = await response.json();

    // console.log('WorkoutFormAdd handleSubmit json:', json);

    if (!response.ok) {
      // console.log(json);
      setFormError(json.error);
      setEmptyFormFields(json.emptyFields);
      setIsAdding(false);
    }

    if (response.ok) {
      setWorkoutTitle('');
      setWorkoutLoad('');
      setWorkoutReps('');
      setFormError(null);
      setEmptyFormFields([]);
      setFormSuccess(true);
      setIsAdding(false);

      // console.log('Workout Created', json);

      // we call the dispatch function here and define the type and the payload, which is the response from the Backend upon successful POST to the Database
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="workout-form-add" onSubmit={handleSubmit} data-test="workout-form-add">
      <div className="workout-form-add-title-container">
        <h3 className="workout-form-add-heading">Add a Workout</h3>
        <div className="workout-form-add-image-container">
          <img className="workout-form-add-image" src="images/female02-stretch03.png" alt="" />
        </div>
      </div>
      <div className="workout-form-add-control">
        <label htmlFor="workout-form-add-title" className="workout-form-add-label">
          Title
        </label>
        <input
          type="text"
          id="workout-form-add-title"
          placeholder="Enter a workout title..."
          value={workoutTitle}
          onChange={(event) => setWorkoutTitle(event.target.value)}
          className={`workout-form-add-input ${
            emptyFormFields.includes('title') ? 'workout-form-add-empty-field-error' : ''
          }`}
          data-test="workout-form-add-title"
        />
      </div>
      <div className="workout-form-add-control">
        <label htmlFor="workout-form-add-load" className="workout-form-add-label">
          Load
        </label>
        <input
          type="number"
          min="0"
          id="workout-form-add-load"
          placeholder="Enter a load in kg..."
          value={workoutLoad}
          onChange={(event) => setWorkoutLoad(event.target.value)}
          className={`workout-form-add-input ${
            emptyFormFields.includes('load') ? 'workout-form-add-empty-field-error' : ''
          }`}
          data-test="workout-form-add-load"
        />
      </div>
      <div className="workout-form-add-control">
        <label htmlFor="workout-form-add-reps" className="workout-form-add-label">
          Reps
        </label>
        <input
          type="number"
          min="0"
          id="workout-form-add-reps"
          placeholder="Enter a number of reps..."
          value={workoutReps}
          onChange={(event) => setWorkoutReps(event.target.value)}
          className={`workout-form-add-input ${
            emptyFormFields.includes('reps') ? 'workout-form-add-empty-field-error' : ''
          }`}
          data-test="workout-form-add-reps"
        />
      </div>
      <button
        className="workout-form-add-button"
        data-test="workout-form-add-submit"
        disabled={isAdding}
      >
        {isAdding ? 'Adding Workout...' : 'Add Workout'}
      </button>
      {formError && <div className="workout-form-add-error">{formError}</div>}
      {formSuccess && (
        <div className="workout-form-add-success" data-test="workout-form-add-success">
          Successfully Added Workout!
          <span
            className="workout-form-add-success-close"
            onClick={() => setFormSuccess(false)}
            data-test="workout-form-add-success-close"
          >
            x
          </span>
        </div>
      )}
    </form>
  );
};

export default WorkoutFormAdd;

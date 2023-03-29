describe('Add Workout Tests', () => {
  it('Add a workout', () => {
    // use custom command to login to be able to test adding a workout
    cy.login();

    cy.wait(1000);

    // pre-check the workout that is about to be updated
    cy.getByData('home-page-workouts-container')
      .find('[data-test="workout-card"]')
      .first()
      .within(() => {
        cy.contains('Test Workout');
        cy.contains('Load: 20 kg');
        cy.contains('Reps: 40');
      });

    // select the workout to update
    cy.getByData('workout-form-update-select').select(1);

    // fill in the update form
    cy.getByData('workout-form-update-title').clear().type('Updated Workout');
    cy.getByData('workout-form-update-load').clear().type('10');
    cy.getByData('workout-form-update-reps').clear().type('30');
    // click the submit button
    cy.getByData('workout-form-update-submit').click();
    // check the success message displays
    cy.getByData('workout-form-update-success').should('exist');

    cy.wait(1000);

    // check the workout has been updated correctly
    cy.getByData('home-page-workouts-container')
      .find('[data-test="workout-card"]')
      .first()
      .within(() => {
        cy.contains('Updated Workout');
        cy.contains('Load: 10 kg');
        cy.contains('Reps: 30');
      });
  });
});

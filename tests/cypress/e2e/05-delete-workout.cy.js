describe('Delete Workout Tests', () => {
  it('Delete a workout', () => {
    // use custom command to login to be able to test adding a workout
    cy.login();

    cy.wait(1000);

    cy.getByData('home-page-workouts-container')
      .find('[data-test="workout-card"]')
      .its('length')
      .then((initialCount) => {
        cy.getByData('home-page-workouts-container')
          .find('[data-test="workout-card"]')
          .first()
          .contains('delete');

        // select the top workout
        // find the delete button
        // click it
        // see if the loading delete thing exists
        // when it disppears
        // recheck the initialCount it should be LESS THAN

        // does the add workout form exist?
        cy.getByData('workout-form-add').should('exist');

        // enter a title
        cy.getByData('workout-form-add-title').should('exist').type('Test Workout');
        // enter a load
        cy.getByData('workout-form-add-load').should('exist').type(20);
        // enter a reps
        cy.getByData('workout-form-add-reps').should('exist').type(40);
        // add the workout (via button click)
        cy.getByData('workout-form-add-submit').should('exist').click();
        // check the success message displays
        cy.getByData('workout-form-add-success')
          .should('exist')
          .should('have.text', 'Successfully Added Workout!x');

        // check the success close button displays and click it closed
        cy.getByData('workout-form-add-success-close').should('exist').click();

        // scroll to the top of the page to see the added workout
        cy.scrollTo('top');

        // check that the number of workout cards has increased
        cy.getByData('home-page-workouts-container')
          .find('[data-test="workout-card"]')
          .should('have.length.gt', initialCount);

        // check the workout card contains the title that was entered
        cy.getByData('home-page-workouts-container').eq(0).contains('Test Workout');

        // check the workout card contains the load that was entered
        cy.getByData('home-page-workouts-container').eq(0).contains('Load: 20 kg');

        // check the workout card contains the reps that was entered
        cy.getByData('home-page-workouts-container').eq(0).contains('Reps: 40');
      });
  });
});

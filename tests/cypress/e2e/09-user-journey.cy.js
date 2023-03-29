describe('User Journey', () => {
  it('starting from unlogged in, a user can login, can see their workouts, can create a new one, delete an existing one, and logout', () => {
    // visit the frontend root route
    cy.visit('http://localhost:3000');

    // because the user is not logged in it should redirect them to the /login path
    cy.location('pathname').should('eq', '/login');

    // enter a username into the login form
    cy.getByData('login-form-email').should('exist').type('test1@test.com');

    // enter a password into the login form
    cy.getByData('login-form-password').should('exist').type('Password123!');

    // click the login button
    cy.getByData('login-form-submit').should('exist').click();
    // the user is now logged in and we should be on the / path

    // check for the user and jwt token in localstorage
    // cy.getAllLocalStorage().then((result) => {
    //   expect(result).to.equal({ "http://localhost:3000": {} });
    // });

    // the path should be the root route
    cy.location('pathname').should('eq', '/');

    // check if the header is displaying the correct/corresponding email address
    cy.getByData('header-nav-user-email').should('exist').contains('test1@test.com');

    // should be able to see workout cards <--- I NEED TO MAKE THIS A CONDITIONAL CHECK, IF NO WORKOUT CARDS OK, IF WORKOUT CARDS ALSO OK
    cy.getByData('workout-card').should('exist');

    // try to add a new workout
    cy.getByData('workout-form-add-title').should('exist').type('Test Workout');
    cy.getByData('workout-form-add-load').should('exist').type(20);
    cy.getByData('workout-form-add-reps').should('exist').type(40);
    cy.getByData('workout-form-add-submit').should('exist').click();
    cy.getByData('workout-form-add-success').should('exist');
    cy.getByData('workout-form-add-success-close').should('exist');

    // scroll to the top of the page to see the newly added workout
    cy.scrollTo('top');

    // try to update the first workout in the list (that was just created)
    cy.getByData('workout-form-update-select').should('exist').select(1);
    cy.getByData('workout-form-update-title')
      .should('exist')
      .click()
      .clear()
      .type('Test Workout Updated');
    cy.getByData('workout-form-update-load').should('exist').click().clear().type(30);
    cy.getByData('workout-form-update-reps').should('exist').click().clear().type(10);
    cy.getByData('workout-form-update-submit').should('exist').click();
    cy.getByData('workout-form-update-success').should('exist');
    cy.getByData('workout-form-update-success-close').should('exist');

    // scroll to the top of the page to see the updated workout
    cy.scrollTo('top');

    // get the first workout (the most recent) and delete it
    cy.getByData('workout-card-delete-button').should('exist').eq(0).click();

    // check if the logout button exists and then click it
    cy.getByData('header-nav-logout').should('exist').click();

    // because the user is logged out in it should redirect them to the /login path
    cy.location('pathname').should('eq', '/login');
  });
});

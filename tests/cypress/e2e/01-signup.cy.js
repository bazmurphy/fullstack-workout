describe('Signup Tests', () => {
  it('gives the user an error when the signup form is not filled', () => {
    cy.visit('http://localhost:3000');
    cy.location('pathname').should('eq', '/login');

    // find the signup button in the nav, and click it
    cy.getByData('header-nav-signup').should('exist').click();

    // it should redirect to /signup
    cy.location('pathname').should('eq', '/signup');

    // there should be no signup form error
    cy.getByData('signup-form-error').should('not.exist');

    // enter an email
    cy.getByData('signup-form-email').should('exist');
    // enter a password
    cy.getByData('signup-form-password').should('exist');
    // click the signup button
    cy.getByData('signup-form-submit').should('exist').click();

    // wait for the response to come back
    cy.wait(1000);

    // there should be a signup form error
    cy.getByData('signup-form-error')
      .should('exist')
      .should('have.text', 'All fields must be filled');
  });

  it('gives the user an error when the email they are trying to signup is already registered', () => {
    cy.visit('http://localhost:3000');
    cy.location('pathname').should('eq', '/login');

    // find the signup button in the nav, and click it
    cy.getByData('header-nav-signup').should('exist').click();

    // it should redirect to /signup
    cy.location('pathname').should('eq', '/signup');

    // there should be no signup form error
    cy.getByData('signup-form-error').should('not.exist');

    // enter an email
    cy.getByData('signup-form-email').should('exist').type('test3@test.com');
    // enter a password
    cy.getByData('signup-form-password').should('exist').type('Password123!');
    // click the signup button
    cy.getByData('signup-form-submit').should('exist').click();

    // wait for the response to come back
    cy.wait(1000);

    // there should be a signup form error
    // there should be a signup form error
    cy.getByData('signup-form-error')
      .should('exist')
      .should('have.text', 'That email is already in use');
  });

  it('gives the user an error when the email is correct but the password is incorrect', () => {
    cy.visit('http://localhost:3000');
    cy.location('pathname').should('eq', '/login');

    // find the signup button in the nav, and click it
    cy.getByData('header-nav-signup').should('exist').click();

    // it should redirect to /signup
    cy.location('pathname').should('eq', '/signup');

    // there should be no signup form error
    cy.getByData('signup-form-error').should('not.exist');

    // enter an email
    cy.getByData('signup-form-email').should('exist').type('test3@test.com');
    // enter a password
    cy.getByData('signup-form-password').should('exist').type('password123');
    // click the signup button
    cy.getByData('signup-form-submit').should('exist').click();

    // wait for the response to come back
    cy.wait(1000);

    // there should be a signup form error
    // there should be a signup form error
    cy.getByData('signup-form-error')
      .should('exist')
      .should(
        'have.text',
        'The password must be a mininum of 8 characters long, and contain at least 1 upper case, lower case, number and symbol'
      );
  });

  it('signs up a user for account when given an email not already registerd and a correctly formatted password, and redirects to the root route', () => {
    // go to the default home page
    cy.visit('http://localhost:3000');
    // because we are not logged in it should redirect to /login
    cy.location('pathname').should('eq', '/login');

    // find the signup button in the nav, and click it
    cy.getByData('header-nav-signup').should('exist').click();

    // it should redirect to /signup
    cy.location('pathname').should('eq', '/signup');
    // enter an email
    cy.getByData('signup-form-email')
      .should('exist')
      .type(`test${Math.floor(Math.random() * 1000)}@test.com`);
    // enter a password
    cy.getByData('signup-form-password').should('exist').type('Password123!');
    // click the signup button
    cy.getByData('signup-form-submit').should('exist').click();

    // it should redirect to /
    cy.location('pathname').should('eq', '/');
  });
});

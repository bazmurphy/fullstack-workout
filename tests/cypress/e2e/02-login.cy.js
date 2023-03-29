describe('Login Tests', () => {
  it('should not login with empty form', () => {
    // visit the frontend root route
    cy.visit('http://localhost:3000');

    // because the user is not logged in it should redirect them to the /login path
    cy.location('pathname').should('eq', '/login');

    // enter a username into the login form - but don't enter anything
    cy.getByData('login-form-email').should('exist');

    // enter a password into the login form - but don't enter anything
    cy.getByData('login-form-password').should('exist');

    // click the login button
    cy.getByData('login-form-submit').should('exist').click();
    // the user is now logged in and we should be on the / path

    cy.getByData('login-form-error')
      .should('exist')
      .should('have.text', 'All fields must be filled');
  });

  it('should not login with an email but no password', () => {
    // visit the frontend root route
    cy.visit('http://localhost:3000');

    // because the user is not logged in it should redirect them to the /login path
    cy.location('pathname').should('eq', '/login');

    // enter a username into the login form - but don't enter anything
    cy.getByData('login-form-email').should('exist').type('test1@test.com');

    // enter a password into the login form - but don't enter anything
    cy.getByData('login-form-password').should('exist');

    // click the login button
    cy.getByData('login-form-submit').should('exist').click();
    // the user is now logged in and we should be on the / path

    cy.getByData('login-form-error')
      .should('exist')
      .should('have.text', 'All fields must be filled');
  });

  it('should not login with no email but with a password', () => {
    // visit the frontend root route
    cy.visit('http://localhost:3000');

    // because the user is not logged in it should redirect them to the /login path
    cy.location('pathname').should('eq', '/login');

    // enter a username into the login form - but don't enter anything
    cy.getByData('login-form-email').should('exist');

    // enter a password into the login form - but don't enter anything
    cy.getByData('login-form-password').should('exist').type('Password123!');

    // click the login button
    cy.getByData('login-form-submit').should('exist').click();
    // the user is now logged in and we should be on the / path

    cy.getByData('login-form-error')
      .should('exist')
      .should('have.text', 'All fields must be filled');
  });

  it('should not login with an incorrect email but a correct password', () => {
    // visit the frontend root route
    cy.visit('http://localhost:3000');

    // because the user is not logged in it should redirect them to the /login path
    cy.location('pathname').should('eq', '/login');

    // enter a username into the login form - but don't enter anything
    cy.getByData('login-form-email').should('exist').type('test@test.com');

    // enter a password into the login form - but don't enter anything
    cy.getByData('login-form-password').should('exist').type('Password123!');

    // click the login button
    cy.getByData('login-form-submit').should('exist').click();
    // the user is now logged in and we should be on the / path

    cy.getByData('login-form-error').should('exist').should('have.text', 'Incorrect email');
  });

  it('should not login with a correct email but an icorrect password', () => {
    // visit the frontend root route
    cy.visit('http://localhost:3000');

    // because the user is not logged in it should redirect them to the /login path
    cy.location('pathname').should('eq', '/login');

    // enter a username into the login form - but don't enter anything
    cy.getByData('login-form-email').should('exist').type('test1@test.com');

    // enter a password into the login form - but don't enter anything
    cy.getByData('login-form-password').should('exist').type('password123');

    // click the login button
    cy.getByData('login-form-submit').should('exist').click();
    // the user is now logged in and we should be on the / path

    cy.getByData('login-form-error').should('exist').should('have.text', 'Incorrect password');
  });

  it('should login with valid credentials', () => {
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

    // check if the header is displaying the correct/corresponding email address
    cy.getByData('header-nav-user-email').should('exist').should('have.text', 'test1@test.com');
  });

  it('should login and logout with valid credentials and logout', () => {
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

    // check if the header is displaying the correct/corresponding email address
    cy.getByData('header-nav-user-email').should('exist').should('have.text', 'test1@test.com');

    // check if the logout button exists and then click it
    cy.getByData('header-nav-logout').should('exist').click();

    // because the user is logged out in it should redirect them to the /login path
    cy.location('pathname').should('eq', '/login');
  });
});

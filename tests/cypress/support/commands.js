// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add(
  'getInputByLabel',
  {
    prevSubject: 'optional',
  },
  (subject, text) => {
    if (subject) {
      return cy
        .get(subject)
        .contains('label', text)
        .then(($label) => {
          const name = $label.attr('for');
          if (name) return cy.get(`#${name}`);
          cy.wrap($label).find('input, select, textarea');
        });
    } else {
      return cy.contains('label', text).then(($label) => {
        const name = $label.attr('for');
        if (name) return cy.get(`#${name}`);
        cy.wrap($label).find('input, select, textarea');
      });
    }
  }
);

Cypress.Commands.add('login', () => {
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
});

// create ""login"" command that takes
// cypress send the POST request with the body
// backend processes
// send the jwtoken
// use cypress to set the localStorage key
// window.localStorage.setItem()

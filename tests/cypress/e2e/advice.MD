// Recommended Advice:
1 test that goes through the signup / form

2 test that goes through login ([a] not neccessarily with the same user [b] or the alternative)

3 TEST PRE-SEEDED login with user that is already exists
[creating test data in a certain way]
[make a user/pass that can be used]
[make a load of exercises]
[then login (which has been made for this usecase), and check that the workouts associated to the account exist (specifically for that user)]

4 logout -- go back to the login form (test h1 is Login etc. -- test the content?)

// balance how small your tests are and how dependent they are on other tests
// how much like a user they are

// balance both tests that all are in one --vs-- individual ones
// [close to how your user uses the system]

//

// Avoid data- tags and use what is visually seen by a Human
// Target things by visual cues

// cy.contains('h3', 'Sign Up').should('be.visible');
// // should be an h1 (accessibility)

// cy.getInputByLabel('Email').type('test6@test.com');
// cy.getInputByLabel('Password').type('Password123!'); // {enter} optional
// cy.contains('button', 'Sign Up').click();

// cy.location('pathname').should('eq', '/');

// // check add a workout exists (janky)
// // no workouts exist <--- add that

// cy.contains('test6@test.com');
// cy.contains('button', 'Log Out');

Cypress.Commands.add('loginWithMobile', (mobileNumber) => {
    cy.visit('/');
    cy.contains('وارد شوید').click();
    cy.get('#mobile-input').type(mobileNumber);
    cy.get('#otp-request-button').click();
  });
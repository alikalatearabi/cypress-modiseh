Cypress.Commands.add('loginWithPassword', (username, password) => {
  // Ignore all uncaught exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    console.error('Uncaught exception:', err.message);
    return false; // Prevent Cypress from failing the test
  });

  cy.visit(Cypress.env('SITE_URL')); // Navigate to the base URL
  cy.get('#customer_data_ajax_not_logged_in') // Locate the login element
    .find('a.account-link') // Find the anchor tag inside
    .click(); // Open the login modal

  cy.get('#otp_system_mobile').type(username); // Enter mobile number
  cy.get('#otp_system_enter_mobile').click(); // Click the login button

  // Check if the password field is displayed
  cy.get('#otp_system_password').should('be.visible');
  cy.get('#otp_system_password').type(password); // Enter password
  cy.get('#otp_system_enter_password').click(); // Submit login
});

Cypress.Commands.add('deleteBankAccountIfExists', () => {
  // Check if the "ثبت حساب جدید" button is visible (meaning no bank account exists)
  cy.get('div.sheba-account').then((div) => {
    if (div.find('button.open-openbanking-popup').length > 0) {
      cy.log('No bank account to delete');
    } else {
      cy.get('.hazfiat a') // Selector for the delete link
        .should('be.visible')
        .click();

      // Wait for the page reload and verify the "ثبت حساب جدید" button appears
      cy.get('button.open-openbanking-popup', { timeout: 10000 }) // Wait for the button to appear
        .should('be.visible')
        .and('contain', 'ثبت حساب جدید');
    }
  })
});

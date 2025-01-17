import '@percy/cypress'; // Import Percy for snapshots

describe('OTP Validation Tests - Step 1', () => {
  beforeEach(() => {
    // Ignore all uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.error('Uncaught exception:', err.message);
      return false; // Prevent Cypress from failing the test
    });
  });

  it('should open the login modal when clicking the وارد شوید button', () => {
    const baseUrl = Cypress.env('SITE_URL'); // Access OS environment variable
    cy.visit(baseUrl); // Navigate to the homepage
    cy.get('#customer_data_ajax_not_logged_in') // Locate the li element by ID
      .find('a.account-link') // Find the anchor tag inside
      .click(); // Click the link

    // Add a Percy snapshot
    cy.percySnapshot('Login Modal Opened');
  });
});

describe('Password Login Validation Tests - Prevent Page Progression', () => {
  beforeEach(() => {
    const baseUrl = Cypress.env('SITE_URL'); // Access OS environment variable
    cy.visit(baseUrl); // Use the environment variable for base URL
    cy.get('#customer_data_ajax_not_logged_in')
      .find('a.account-link')
      .click();
  });

  it('should not proceed to the next page when the mobile number is empty', () => {
    cy.get('#otp_system_enter_mobile').click();

    // Add a Percy snapshot after clicking
    cy.percySnapshot('Empty Mobile Number Error');

    // Check for the error message
    cy.get('.otp_system_error_msg')
      .should('be.visible')
      .and('contain', 'این فیلد نمی تواند خالی باشد.');

    // Verify the URL still includes the login path
    cy.url().should('include', '/customer/account/login');
  });

  it('should not proceed to the next page with an incorrect password', () => {
    cy.get('#otp_system_mobile').type('09123046863');
    cy.get('#otp_system_enter_mobile').click();
    cy.get('#otp_system_password').type('WrongPassword!');
    cy.get('#otp_system_enter_password').click();

    // Add a Percy snapshot after entering incorrect password
    cy.percySnapshot('Incorrect Password Error');

    // Check for the error message
    cy.get('.otp_system_error_msg')
      .should('be.visible');

    // Verify the URL still includes the login path
    cy.url().should('include', '/customer/account/login');
  });
});


// ارور رمز عبور مشکل املایی دارد
// ایا متن ارورها نیز چک شود یا خیر
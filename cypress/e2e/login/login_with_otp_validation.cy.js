describe('OTP Login Validation Tests - Step 1', () => {
    beforeEach(() => {
        // Ignore all uncaught exceptions
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Uncaught exception:', err.message);
            return false; // Prevent Cypress from failing the test
        });

        // Open the login page
        cy.visit('/');
        cy.get('#customer_data_ajax_not_logged_in')
            .find('a.account-link')
            .click();
    });

    it('should display an error for invalid OTP', () => {
        // Enter the mobile number
        cy.get('#otp_system_mobile').type('09121234567');

        // Request OTP
        cy.get('#otp_system_enter_mobile').click();

        // Enter an incorrect OTP (split across four input fields)
        cy.get('#validate_code_1').type('1');
        cy.get('#validate_code_2').type('2');
        cy.get('#validate_code_3').type('3');
        cy.get('#validate_code_4').type('4');

        // Click the continue button
        cy.get('#otp_system_otp_password') // Target the OTP continue button
            .click();

        // Verify the error message
        cy.get('.otp_system_error_msg') // Check for the error message element
            .should('be.visible')

        // Verify the URL still includes the login path
        cy.url().should('include', '/customer/account/login');

        // Take a screenshot at desktop size
        cy.viewport(1280, 720); // Desktop resolution
        cy.screenshot('invalid-otp-test-desktop');

        // Take a screenshot at tablet size
        cy.viewport(768, 1024); // Tablet resolution
        cy.screenshot('invalid-otp-test-tablet');

        // Take a screenshot at mobile size
        cy.viewport(375, 667); // Mobile resolution
        cy.screenshot('invalid-otp-test-mobile');
    });
});

describe('OTP Login Validation Tests - Step 2', () => {
    beforeEach(() => {
      // Ignore all uncaught exceptions
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false; // Prevent Cypress from failing the test
      });
  
      // Open the login page
      cy.visit('/');
      cy.get('#customer_data_ajax_not_logged_in')
        .find('a.account-link')
        .click();
    });
  
    it('should display an error when OTP is empty', () => {
      // Enter the mobile number
      cy.get('#otp_system_mobile').type('09121111116');
  
      // Request OTP
      cy.get('#otp_system_enter_mobile').click();
  
      // Leave OTP fields empty and click the continue button
      cy.get('#otp_system_otp_password') // Target the OTP continue button
        .click();
  
      // Verify the error message
      cy.get('.otp_system_error_msg') // Check for the error message element
        .should('be.visible')
  
      // Verify the URL still includes the login path
      cy.url().should('include', '/customer/account/login');
    });
  });

  describe('OTP Login Validation Tests - Step 3', () => {
    beforeEach(() => {
      // Ignore all uncaught exceptions
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false; // Prevent Cypress from failing the test
      });
  
      // Open the login page
      cy.visit('/');
      cy.get('#customer_data_ajax_not_logged_in')
        .find('a.account-link')
        .click();
    });
  
    it('should verify the countdown, enable resend OTP, and reset the timer after clicking resend', () => {
      // Enter the mobile number
      cy.get('#otp_system_mobile').type('09121111112');
  
      // Request OTP
      cy.get('#otp_system_enter_mobile').click();
  
      // Verify the countdown starts
      cy.get('#countdown1')
        .should('be.visible')
        .and('contain', 'ارسال مجدد بعد از');
  
      // Wait for the countdown to complete (90 seconds)
      cy.wait(90000);
  
      // Verify the resend OTP text is now visible and clickable
      cy.get('#otp_system_resend_code')
        .should('be.visible')
        .and('contain', 'ارسال مجدد کد تایید')
        .click(); // Click to resend OTP
  
      // Verify the countdown resets
      cy.get('#countdown1')
        .should('be.visible')
        .and('contain', 'ارسال مجدد بعد از');
    });
  });

  describe('OTP Login Validation Tests - Step 6', () => {
    beforeEach(() => {
      // Ignore all uncaught exceptions
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false; // Prevent Cypress from failing the test
      });
  
      // Open the login page
      cy.visit('/');
      cy.get('#customer_data_ajax_not_logged_in')
        .find('a.account-link')
        .click();
    });
  
    it('should verify OTP input fields appear for first-time login', () => {
      // Generate a random phone number
  
      // Enter the random phone number
      cy.get('#otp_system_mobile').type('09121111113');
  
      // Request OTP
      cy.get('#otp_system_enter_mobile').click();
  
      // Verify OTP input fields are visible
      cy.get('#validate_code_1').should('be.visible');
      cy.get('#validate_code_2').should('be.visible');
      cy.get('#validate_code_3').should('be.visible');
      cy.get('#validate_code_4').should('be.visible');
    });
  });
  
  
  
  // یک شماره برای تست ارسال کد otp
  // سناریو مینیمایز شدن 
  // چطور بفهمیم بار اول است که ثبت نام کرده

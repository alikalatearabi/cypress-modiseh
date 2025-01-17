describe('User Bank Account Tests', () => {
    beforeEach(() => {
        cy.loginWithPassword('09123046863', 'ali18061375');
        cy.wait(2000)
        cy.visit('https://www.modiseh.com/openbankingfront/');
    });

    it('should display the "ثبت حساب جدید" button if no bank accounts exist', () => {
        // Check if the "ثبت حساب جدید" button is visible
        cy.get('button.open-openbanking-popup') // Selector for the button
            .should('be.visible')
            .and('contain', 'ثبت حساب جدید'); // Verify the button text
    });
});

describe('User Bank Account Tests - Register New Account', () => {
    beforeEach(() => {
        cy.loginWithPassword('09123046863', 'ali18061375'); // Log in
        cy.wait(2000)
        cy.visit('https://www.modiseh.com/openbankingfront/'); // Navigate to bank account page
    });

    it('should register a new account with a valid IBAN', () => {
        // Step 1: Click the "ثبت حساب جدید" button
        cy.get('button.open-openbanking-popup') // Selector for the button
            .should('be.visible')
            .click();

        // Step 2: Enter a valid IBAN in the input field
        const validIban = '040610000007001000173892'; // Replace with actual valid IBAN
        cy.get('#sheba_account_number_validation') // IBAN input field
            .should('be.visible')
            .type(validIban);

        // Step 3: Click the "ذخیره حساب" button
        cy.get('button.sheba_validate_btn') // Save account button
            .should('be.visible')
            .click();

        // Step 4: Verify the account details are displayed
        cy.get('#account_name') // Account holder's name
            .should('contain', 'علي كلاته عربي / فعال'); // Replace with expected name
        cy.get('#bank_name') // Bank name
            .should('contain', 'بانک شهر'); // Replace with expected bank name

        // Step 5: Click the "تایید" button
        cy.get('button.sheba_submit_btn') // Confirm button
            .should('be.visible')
            .click();

        // Step 6: Verify the IBAN is added to the main page
        cy.get('.sheba-account') // Container for the added IBAN
            .should('be.visible')
            .within(() => {
                cy.get('.onvan-sheb') // Bank name in the account card
                    .should('contain', 'بانک شهر');
                cy.contains('شماره شبا: IR040610000007001000173892'); // Full IBAN with "IR"
            });
    });
});

describe('User Bank Account Tests - Delete Bank Account', () => {
    beforeEach(() => {
        cy.loginWithPassword('09123046863', 'ali18061375'); // Log in
        cy.wait(2000);
        cy.visit('https://www.modiseh.com/openbankingfront/'); // Navigate to bank account page
    });

    it('should delete an existing bank account and show the "ثبت حساب جدید" button', () => {
        // Precondition: Ensure a bank account exists
        cy.get('.hazfiat') // Check if the delete button container exists
            .should('exist')
            .and('be.visible');

        // Step 1: Click the "حذف" (Delete) button
        cy.get('.hazfiat a') // Selector for the delete link
            .should('be.visible')
            .click();

        // Step 2: Wait for the page to reload and verify the "ثبت حساب جدید" button appears
        cy.get('button.open-openbanking-popup') // Selector for the "ثبت حساب جدید" button
            .should('be.visible')
            .and('contain', 'ثبت حساب جدید'); // Verify the button text
    });
});

describe('User Bank Account Tests - Edit Account with Valid IBAN', () => {
    beforeEach(() => {
        cy.loginWithPassword('09123046863', 'ali18061375'); // Log in
        cy.wait(2000)
        cy.visit('https://www.modiseh.com/openbankingfront/'); // Navigate to bank account page
    });

    it('should edit the bank account with a valid IBAN', () => {
        // Step 1: Ensure the bank account exists and is visible
        cy.get('.hazfiat') // Bank account section
            .should('be.visible') // Ensure the section is visible
            .within(() => {
                cy.contains('ویرایش'); // Ensure the "ویرایش" (Edit) button is visible
            });

        // Step 2: Click the "ویرایش" (Edit) button
        cy.get('.hazfiat') // Find the edit button
            .contains('ویرایش') // Target the edit text
            .click();

        // Step 4: Enter a valid IBAN into the input field
        const newValidIban = '950150000003130105947544'; // Example new valid IBAN
        cy.get('#sheba_account_number_validation') // IBAN input field
            .clear() // Clear the existing IBAN
            .type(newValidIban); // Enter the new IBAN

        // Step 5: Click the "ذخیره حساب" button
        cy.get('button.sheba_validate_btn') // Save account button
            .should('be.visible')
            .click();

        // Step 6: Verify the account details are displayed
        cy.get('#account_name') // Account holder's name
            .should('contain', 'علي كلاته عربي / فعال'); // Replace with expected name
        cy.get('#bank_name') // Bank name
            .should('contain', 'سپه'); // Replace with expected bank name

        // Step 7: Click the "تایید" button
        cy.get('button.sheba_submit_btn') // Confirm button
            .should('be.visible')
            .click();

        // Step 8: Verify the IBAN is added to the main page
        cy.get('.sheba-account') // Container for the added IBAN
            .should('be.visible')
            .within(() => {
                cy.get('.onvan-sheb') // Bank name in the account card
                    .should('contain', 'سپه');
                cy.contains('شماره شبا: IR950150000003130105947544'); // Full IBAN with "IR"
            });
    });
});

describe('User Bank Account Tests - Enter Invalid IBAN', () => {
    beforeEach(() => {
        cy.loginWithPassword('09123046863', 'ali18061375'); // Log in
        cy.wait(2000);
        cy.visit('https://www.modiseh.com/openbankingfront/'); // Navigate to bank account page
        cy.deleteBankAccountIfExists(); // Delete any existing bank account using the custom command
    });

    it('should display an error message for an invalid IBAN', () => {
        cy.task('fetchIban').then((iban) => {
            cy.log(`Fetched IBAN: ${iban}`);
        });
        // Step 1: Click the "ثبت حساب جدید" button to open the bank account registration form
        cy.get('button.open-openbanking-popup') // Selector for the "ثبت حساب جدید" button
            .should('be.visible')
            .click();

        // Step 2: Enter an invalid IBAN in the input field
        const invalidIban = '950150000003130105947542'; // Invalid IBAN
        cy.get('#sheba_account_number_validation') // IBAN input field
            .should('be.visible')
            .type(invalidIban);
        //step 3: Click the "ذخیره حساب" button
        cy.get('button.sheba_validate_btn') // Save account button
            .should('be.visible')
            .click();

        // Step 4: Verify the error message is displayed
        cy.get('#error-boxes-msg') // Error message container
            .should('be.visible')
            .within(() => {
                cy.get('#error-sheba-validate') // Error message
                    .should('contain', 'شماره حساب وارد شده معتبر نمی باشد.');
            });
    });
});


// تاییدیه برای حذف حساب وجود ندارد
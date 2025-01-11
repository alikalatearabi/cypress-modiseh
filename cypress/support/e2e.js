import 'cypress-mochawesome-reporter/register';
import '@percy/cypress';

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('missing ) after argument list')) {
        return false; 
    }

    return true;
});
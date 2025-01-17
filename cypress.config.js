const { defineConfig } = require('cypress');
const { Client } = require('pg');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        fetchIban() {
          const client = new Client({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'testdb',
          });

          return client.connect()
            .then(() => client.query('SELECT iban FROM ibans LIMIT 1'))
            .then((result) => {
              client.end();
              return result.rows[0].iban; // Return the first IBAN
            })
            .catch((err) => {
              client.end();
              throw err;
            });
        },
      });
    },
    // baseUrl: 'https://www.modiseh.com',
    retries: {
      runMode: 1, // Number of retries in headless mode (cypress run)
      openMode: 1, // Number of retries in interactive mode (cypress open)
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/commands.js',
  },
  reporter: 'cypress-mochawesome-reporter', // Use the mochawesome reporter
  reporterOptions: {
    reportDir: 'cypress/reports', // Directory to save the reports
    overwrite: false, // Avoid overwriting previous reports
    html: true, // Generate an HTML report
    json: true, // Generate a JSON report
    charts: true, // Include charts in the report
    reportPageTitle: 'Modiseh Test Report', // Set a custom title for the report
    embeddedScreenshots: true, // Embed screenshots directly in the report
    inlineAssets: true, // Inline assets for a single-file report
  },
});

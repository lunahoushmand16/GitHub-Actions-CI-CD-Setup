import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: customViteConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    indexHtmlFile: 'cypress/support/component-index.html'
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    reporter: 'mochawesome', // ✅ Add this line
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});


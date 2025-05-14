import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    port: 5173,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3001',
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});

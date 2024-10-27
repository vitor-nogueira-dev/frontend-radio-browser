import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(_, config) {
      return config
    },
    baseUrl: 'http://localhost:3000',
  },
})
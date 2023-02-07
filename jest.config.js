module.exports = {
  rootDir: "./app/javascript",
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts[x]?$': 'ts-jest'
  },
  moduleDirectories: [
    "node_modules",
    "./app/javascript"
  ],
  reporters: ['jest-progress-bar-reporter'],
  setupFiles: [`<rootDir>/setupTests/index.js`],
}

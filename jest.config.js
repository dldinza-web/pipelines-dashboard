module.exports = {
  testEnvironment: 'jsdom',
  rootDir: "./app/javascript",
  moduleDirectories: [
    "node_modules",
    "./app/javascript"
  ],
  reporters: ['jest-progress-bar-reporter']
}

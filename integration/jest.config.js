module.exports = {
    preset: 'jest-playwright-preset',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
}
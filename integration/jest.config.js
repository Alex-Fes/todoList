module.exports = {
    preset: ["@babel/react", "@babel/env"],
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
}
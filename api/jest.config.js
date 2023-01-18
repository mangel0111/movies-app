module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(mjs?|jsx?|js?|tsx?|ts?)$',
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\$": "babel-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "mjs"]
}

// When running through npm run test, this config is not used, CRA uses its own, pointing to setupTests.js.
// This one can be used to run jest without going through react-scripts: for example, I normally use
// an extension called "Jest Runner" that allows to run or debug specific tests easily, that one uses this.

module.exports = {
  moduleNameMapper: { "\\.(css|sass)$": "identity-obj-proxy" },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
};

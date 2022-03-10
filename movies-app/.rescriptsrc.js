const path = require("path");

const createLoaderMatcher = (loader) => (rule) =>
  rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1; //eslint-disable-line

const oneOfFileLoaders = (config) =>
  config.module.rules.find((rule) => rule.oneOf).oneOf;

const cssLoaderMatcher = createLoaderMatcher("css-loader");

const sassLoaderMatcher = createLoaderMatcher("sass-loader");

const addCamelCaseToCSSModules = (config) => {
  const fileLoaders = oneOfFileLoaders(config);

  fileLoaders.forEach((loader) => {
    if (loader.test && loader.use && loader.use.constructor === Array) {
      loader.use.forEach((use) => {
        if (cssLoaderMatcher(use) && use.options.modules) {
          use.options.modules.exportLocalsConvention = "camelCase";
        }
        if (sassLoaderMatcher(use)) {
          use.options.sassOptions = {
            ...use.options.sassOptions,
            includePaths: [path.resolve(__dirname, "src/scss")],
          };
        }
      });
    }
  });
};

const customConfig = (config) => {
  addCamelCaseToCSSModules(config);
  return config;
};

module.exports = [customConfig];

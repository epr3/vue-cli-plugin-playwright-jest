module.exports = (api) => {
  api.registerCommand(
    "test:e2e",
    {
      description: "run e2e tests with jest and playwright",
      usage: "vue-cli-service test:e2e [options] <regexForTestFiles>",
      options: {
        "--watch": "run tests in watch mode",
      },
      details:
        `All jest command line options are supported.\n` +
        `See https://facebook.github.io/jest/docs/en/cli.html for more details.`,
    },
    (args, rawArgv) => {
      // for @vue/babel-preset-app <= v4.0.0-rc.7
      process.env.VUE_CLI_BABEL_TARGET_NODE = true;
      process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;
      require("jest").run(["-c", "./tests/e2e/jest.e2e.config.js", ...rawArgv]);
    }
  );
};

module.exports.defaultModes = {
  "test:e2e": "production",
};

module.exports = (api, options, rootOptions, invoking) => {
  api.render("./template", {
    hasTS: api.hasPlugin("typescript"),
    hasBabel: api.hasPlugin("babel"),
  });

  api.extendPackage({
    scripts: {
      "test:e2e": "vue-cli-service test:e2e",
    },
  });

  if (api.hasPlugin("eslint")) {
    applyESLint(api);
  }

  if (api.hasPlugin("typescript")) {
    applyTS(api, invoking);
  }
};

const applyESLint = (module.exports.applyESLint = (api) => {
  api.extendPackage({
    devDependencies: {
      "eslint-plugin-jest-playwright": "^0.2.1",
    },
    eslintConfig: {
      extends: ["plugin:jest-playwright/recommended"],
      overrides: [
        {
          files: ["**/tests/e2e/**/*.spec.{j,t}s?(x)"],
          env: {
            jest: true,
          },
        },
      ],
    },
  });
});

const applyTS = (module.exports.applyTS = (api, invoking) => {
  api.extendPackage({
    devDependencies: {
      "@types/jest": "^26.0.19",
    },
  });

  if (invoking) {
    // inject jest type to tsconfig.json
    api.render((files) => {
      const tsconfig = files["tsconfig.json"];
      if (tsconfig) {
        const parsed = JSON.parse(tsconfig);
        if (
          parsed.compilerOptions.types &&
          !parsed.compilerOptions.types.includes("jest")
        ) {
          parsed.compilerOptions.types.push("jest");
        }

        if (
          parsed.compilerOptions.types &&
          !parsed.compilerOptions.types.includes("jest-playwright-preset")
        ) {
          parsed.compilerOptions.types.push("jest-playwright-preset");
        }

        if (
          parsed.compilerOptions.types &&
          !parsed.compilerOptions.types.includes("expect-playwright")
        ) {
          parsed.compilerOptions.types.push("expect-playwright");
        }
        files["tsconfig.json"] = JSON.stringify(parsed, null, 2) + "\n";
      }
    });
  }
});

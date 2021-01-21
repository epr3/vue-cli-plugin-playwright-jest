module.exports = {
  preset: <%_ if (hasTS) { _%><%_ if (hasBabel) { _%>"vue-cli-plugin-playwright-jest/presets/typescript-and-babel"<%_ } else { _%>"vue-cli-plugin-playwright-jest/presets/typescript"<%_ } _%><%_ } else { _%>"vue-cli-plugin-playwright-jest/presets/default"<%_ } _%>
};

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  testEnvironment: "node",
  transformIgnorePatterns: [
    "node_modules\/(?!(@adraffy))"
  ]
}

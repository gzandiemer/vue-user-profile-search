module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/main.ts', // Exclude specific files as necessary
    '!**/node_modules/**',
    '!**/vendor/**'
  ]
};

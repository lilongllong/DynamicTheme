module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
    'ts',
    'jsx',
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue,ts}',
    // 虚拟人相关的暂不纳入单测范围
    '!src/views/virtualPerson/**',
    '!src/assets/**',
    '!src/styles/**',
    '!src/components/Table/tableDemo.vue',
    '!src/components/Table/textComponents/vc-select.jsx',
  ],
  coverageReporters: ['html', 'text-summary'],
  snapshotSerializers: ['jest-serializer-vue'],
  // testMatch: ['<rootDir>/tests/**/?(*.)spec.{ts,tsx}'],
  testMatch: ['**/tests/**/?(*.)spec.{ts,tsx}'],
  // clearMocks: true,
  coverageDirectory: 'coverage',
  // coverageReporters: [
  //    "json-summary",
  //    "text",
  //    "lcov"
  //  ]
  reporters: [
    'default',
    ['jest-junit', {
      suiteName: '行业平台单元测试',
      outputDirectory: '.',
      outputName: 'ut_gtest.xml',
      uniqueOutputName: 'false',
      classNameTemplate: '{classname}-{title}',
      titleTemplate: '{classname}-{title}',
      ancestorSeparator: ' › ',
      usePathForSuiteName: 'true',
    }],
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts', 'jest-canvas-mock'],
  transformIgnorePatterns: ['<roodDir>/node_modules/(?!@swish)'],
};

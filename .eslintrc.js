module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/essential',
    '@vue/typescript',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'max-len': ['off'],
    'no-underscore-dangle': ['warn'],
    'spaced-comment': ['warn'],
    'no-param-reassign': ['warn', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex
      ]
    }],
    "no-v-model-argument": "off",
    'no-unused-vars': ['warn', {
      vars: 'all',
      args: 'none',
      ignoreRestSiblings: false,
    }],
    'camelcase': ['warn'],
    'color-hex-length': 'off',
    'color-hex-case': ['off'],
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true, // Allow `const { props, state } = this`; false by default
        allowedNames: ['self'], // Allow `const self = this`; `[]` by default
      },
    ],
    "@typescript-eslint/no-require-imports": "warn"
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};

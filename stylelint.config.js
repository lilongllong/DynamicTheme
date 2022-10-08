module.exports = {
  defaultSeverity: 'error',
  extends: [],
  plugins: ['stylelint-scss'],
  rules: {
    'property-no-vendor-prefix': [true, { ignoreProperties: ['box-orient'] }],
    'value-no-vendor-prefix': [true, { ignoreValues: ['box'] }],
    'selector-max-id': [3],
    'declaration-no-important': null,
  },
  ignoreFiles: ['./public/css/*.less'],
};

// https://github.com/michael-ciniawsky/postcss-load-config
const AddAntClass = require('./script/addAntCssPrefix');
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    AddAntClass({ prefix: 'industryAnt' }),
    autoprefixer({}),
  ],
};

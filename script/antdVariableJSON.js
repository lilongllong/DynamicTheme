const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const paletteLess = fs.readFileSync(path.resolve(__dirname, './styles/themes/default.less'), 'utf8');

// Pass in file contents
const palette = lessToJs(paletteLess, { resolveVariables: false, stripPrefix: false });
console.log(palette, 'palette');
module.exports = palette;

// 微应用的 webpack 配置
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require('../package.json');

// 根据 qiankun 要求更新 dev server
// 目前发现更新后会影响热更新，所以把它放到
const updateMicroAppDevServer = (configChain) => {
  if (!process.env.MICRO_APP) {
    return;
  }

  configChain.devServer
    .headers({
      'Access-Control-Allow-Origin': '*',
    })
    .hot(true)
    .historyApiFallback(true)
    .watchContentBase(false);
};

// 根据 qiankun 要求更新 output 内容
const updateMicroAppOutput = (configChain) => {
  configChain.output
    .library(`${pkg.name}-[name]`)
    .libraryTarget('umd')
    .jsonpFunction(`webpackJsonp_${pkg.name}`)
    .globalObject('window');
};

const updateFonts = (configChain) => {
  configChain.module.rule('fonts').use('url-loader').loader('url-loader').options({}).end();
  configChain.module.rule('images').use('url-loader').loader('url-loader').options({}).end();
}

module.exports = {
  updateMicroAppOutput,
  updateMicroAppDevServer,
  updateFonts
};

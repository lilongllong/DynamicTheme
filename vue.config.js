/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const StylintPlugin = require('stylelint-webpack-plugin');
const Package = require('./package.json');
const AddAntClass = require('./script/addAntCssPrefix');
const { updateMicroAppOutput, updateMicroAppDevServer, updateFonts } = require('./script/microApp');

let publicPath;

if (process.env.NODE_ENV === 'development') {
  // 本地开发仍然使用默认值
  publicPath = '/chatbot';
}

let devServer;
if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_SERVE_MODE === 'nohost') {
  devServer = {
    public : '',
    disableHostCheck : true,
    allowedHosts: [
      '',
    ],
  };
}

module.exports = {
  crossorigin: 'anonymous',
  publicPath,
  outputDir: 'public/cdn',
  assetsDir: 'assets',
  transpileDependencies: [
    // 'vue-echarts',
    // 'resize-detector',
    // '@antv/g6',
  ],
  chainWebpack: (config) => {
    config
      .plugin('copy')
      .tap(args => {
        args[0].forEach(pattern => {
          if (pattern.from === path.resolve('public')) {
            pattern.ignore.push({
              glob: 'cdn',
              matchBase: false,
            });
          }
        });
        return args;
      });
    if (process.env.analyzer) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
    updateMicroAppOutput(config);
    updateMicroAppDevServer(config);
    updateFonts(config);
    config.externals({ './cptable': 'var cptable' });

    // 2020-06-29 10:28:00
    // FIXME: worker-loader计算hash目前看是使用配置文件hash值，然后加在worker文件上
    config.module
      .rule('worker-loader')
      .test(/\.worker.js$/)
      .use()
      .loader('worker-loader')
      .options({ inline: true, name: 'WorkerName.[hash].js' });

    config.module
      .rule('babel-worker')
      .test(/\.worker\.js$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end();

    config.resolve.alias.set('@ant-design/icons/lib/dist$', path.resolve(__dirname, './src/icons.js'));
    config
      .plugin('ignore')
      .use(webpack.IgnorePlugin)
      .init(Plugin => new Plugin(/^\.\/locale$/, /moment$/));
    config.when(process.env.NODE_ENV === 'production', cfg => {
      cfg
        .plugin('compression')
        .use(CompressionPlugin)
        .init(
          Plugin =>
            new Plugin({
              test: /\.(js|html|css)$/,
              threshold: 10240,
              deleteOriginalAssets: false,
            }),
        );
    });
    config.plugin('define').tap(definitions => {
      const gitRevisionPlugin = new GitRevisionPlugin({ branch: true });
      const commit = gitRevisionPlugin.commithash().substr(0, 8);
      const branch = gitRevisionPlugin.branch();
      Object.assign(definitions[0]['process.env'], {
        GIT_VERSION: JSON.stringify(`${branch}-${commit}`),
        GIT_BRANCH: JSON.stringify(branch),
        GIT_COMMIT: JSON.stringify(commit),
        PROJ_VERSION: JSON.stringify(Package.version),
        BUILD_TIME: JSON.stringify(new Date().toISOString()),
        BASE_URL: JSON.stringify('/'),
      });
      return definitions;
    });

    if (process.env.VUE_APP_BUILD_MODE === 'private') {
      config.plugin('define').tap(definitions => {
        Object.assign(definitions[0]['process.env'], {
          VUE_APP_BUILD_MODE: JSON.stringify(process.env.VUE_APP_BUILD_MODE),
        });
        return definitions;
      });
    }
  },

  productionSourceMap: false,

  parallel: false,

  configureWebpack: {
    plugins: [
      new StylintPlugin({
        files: ['**/*.{vue,html,css,less}'],
        fix: false,
        cache: true,
        emitErrors: true,
        failOnError: false,
      }),
    ],
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@ant-prefix': 'industryAnt', // 前缀
          // 'primary-color': '#0052d9',
          // 'link-color': '#0052d9',
          // 'btn-primary-color': '#ffffff',
          // 'btn-danger-bg': '#e34d59',
          // 'disabled-color': 'rgba(15, 24, 41, .3);',
          // 'btn-disable-bg': '#eaedf2',
          // 'text-color': '#0F1829',
        },
        module: true,
      },
      postcss: {
        plugins: [
          AddAntClass({ prefix: 'industryAnt' })
        ],
      }
    },
  },

  devServer,

  pwa: {
    workboxOptions: {
      skipWaiting: true,
      // sw activated后控制页面
      clientsClaim: true,
    },
  },
};

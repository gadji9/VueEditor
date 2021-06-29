// const path = require('path');
// const glob = require('glob');
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
//   lintOnSave: false,
//   configureWebpack: {
//     plugins: [
//       new SpriteLoaderPlugin()
//     ]
//   },
//   chainWebpack: config => {
//     config.module.rules.delete('svg');

//     config
//       .entry('app')
//       .clear()
//       .add(path.resolve(__dirname, './src/main.js'))

//     config
//       .entry('sprite')
//       .add(...glob.sync(path.resolve(__dirname, './src/assets/*.svg')));

//     config.module.rule('svg')
//       .test(/\.(svg)(\?.*)?$/)
//       .use('file-loader')
//       .loader('svg-sprite-loader')
//       .options({
//         extract: true,
//         spriteFilename: 'icons.svg'
//       })
//     }
};
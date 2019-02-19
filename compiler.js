const webpack = require('webpack');
const memoryfs = require('memory-fs');

const webpackConfig = require('./config/webpack.prod.config.js');
const compiler = webpack(webpackConfig);

compiler.outputFileSystem = new memoryfs();

return new Promise((resolve, reject) => {
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) reject(err);

    resolve(stats);
  });
});

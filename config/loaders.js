const path = require('path');

const babelLoader = {
  test: /\.js$/,
  loader: require.resolve('babel-loader'),
  exclude: /node_modules/
};

const urlLoader = {
  test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
  loader: require.resolve('url-loader')
};

const fileLoader = {
  test: urlLoader.test,
  loader: require.resolve('file-loader')
};

const manifestLoader = {
  test: /manifest.json$/,
  loader: path.resolve('./manifest-loader/index'),
  options: {
    production: {
      start_url: 'festive-bhabha-7e881b.netlify.com',
      icon_src: 'https://festive-bhabha-7e881b.netlify.com/icon.png'
    }
  }
};

const server = [
  {
    oneOf: [
      babelLoader,
      urlLoader,
      fileLoader,
      manifestLoader
    ],
  }
];

module.exports = { server };

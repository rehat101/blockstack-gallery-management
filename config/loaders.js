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

const server = [
  {
    oneOf: [
      babelLoader,
      urlLoader,
      fileLoader
    ],
  }
];

module.exports = { server };

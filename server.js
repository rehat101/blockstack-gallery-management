const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const cors = require('cors');
const path = require('path');

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  allowedHeaders: 'X-Requested-With, content-type, Authorization'
};

const app = express();
const PORT = 8080;

app.use(cors(corsOptions));
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));

app.get('*', (req, res) => {
  const index = path.join(compiler.outputPath,'index.html');

  compiler.outputFileSystem.readFile(index, (err, result, next) => {

    if (err) {
      return next(err);
    }

    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });

});

app.listen(PORT, () => {
    console.log(`🚀 http server started on port ${PORT}`);
});

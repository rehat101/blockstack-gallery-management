const express = require('express');
const webpack = require('webpack');
const cors = require('cors');
const path = require('path');

const webpackConfig = require('./config/webpack.base.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  allowedHeaders: 'X-Requested-With, content-type, Authorization'
};

const app = express();
app.use(cors(corsOptions));

if(process.env.NODE_ENV === 'production') {

  app.use('/', express.static(__dirname + '/public/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/build/index.html'));
  });

} else {

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

}

app.listen(process.env.PORT || 8080, () => {
    console.log(
      `[${new Date().toISOString()}]`,
      `enviornment ${process.env.NODE_ENV}`,
      `🌎 http server started on port ${process.env.PORT || 8080}`
    );
});

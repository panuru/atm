import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const APP_PORT = 3000;

const compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['eslint-loader'],
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      }, {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      { test: /\.(woff2?|eot|ttf|svg|png)$/, loader: 'url' }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './node_modules')]
  },
  output: { filename: 'app.js', path: '/' }
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/js/',
  stats: { colors: true }
});

// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

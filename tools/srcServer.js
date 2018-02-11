import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import {authors} from '../src/api/mockAuthorApi';
import {courses} from '../src/api/mockCourseApi';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(express.static('src'));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/data/authors', function(req, res) {
  res.send(authors);
});

app.get('/data/courses', function(req, res) {
  res.send(courses);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

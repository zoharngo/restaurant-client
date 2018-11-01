'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use(_express2.default.static('public'));
app.set('view engine', 'ejs');

app.get('/*', (req, res) => {
  res.render('index');
});

app.listen(_config2.default.PORT, '0.0.0.0', () => {
  console.info(`Running on ${_config2.default.PORT}...`);
});
require('../node_modules/bootstrap/dist/css/bootstrap');
require('../style/main.css');

var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/App.react');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

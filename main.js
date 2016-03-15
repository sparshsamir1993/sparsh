var ReactDOM = require('react-dom');
var React = require('react');

var App = React.createFactory( require('./js/app.jsx') );

ReactDOM.render(App(), document.getElementById('container'));

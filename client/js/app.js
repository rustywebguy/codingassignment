
var React = require('react');
var ReactDom = require('react-dom');
var BlogTask = require('./components/BlogTask');
var BlogApi = require('./utils/BlogApi');

// Load API Call
BlogApi.get();

ReactDom.render(
    <BlogTask />,
    document.getElementById('blogtask')
);
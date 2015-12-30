var React = require('react');

var Header = React.createClass({

    render: function() {
      	return (
            <header className="main-header">
            	<div className="inner">
					<a className="logo">Blog Task</a>
				</div>
            </header>
        );
    }

});

module.exports = Header;
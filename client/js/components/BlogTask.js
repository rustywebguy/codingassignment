
var React = require('react');
var BlogAppStore = require('../stores/BlogAppStore');
var BlogApi = require('../utils/BlogApi');

var Header = require('./Header');
var Content = require('./Content');
var Forms = require('./Forms');

function getBlogState(){
    return {
        blogs: BlogAppStore.getAllBlog(),
        editVisible: BlogAppStore.editVisible(),
        response: BlogAppStore.getResponse(),
        expanded: BlogAppStore.isExpand()
    }
}

var BlogTask = React.createClass({

	getInitialState: function() {
        return { blogs: [], response: {action: '', message: ''}, expanded: {id: null, expand:false, body: ''} };
    },

    componentDidMount: function() {
        BlogAppStore.addChangeListener(this._onChange);
        window.setInterval(this._loadNewData, 5000);
    },

    componentWillUnmount: function() {
        BlogAppStore.removeChangeListener(this._onChange);
    },
  	
  	render: function() {
	    return (
	    	<div>
	      		<Header />
	      		<div className="wrap">
	      			<div className="content">
	      				<section className="main">
				      		<Content blogs={this.state.blogs} edit={this.state.editVisible} response={this.state.response} expanded={this.state.expanded}/>
				      	</section>
				      	<Forms response={this.state.response}/>
			      	</div>
		      	</div>
	      	</div>
	    );
  	},

    _loadNewData: function(){
        BlogApi.get();
    },

  	_onChange: function() {
        this.setState(getBlogState());
    }

});

module.exports = BlogTask;
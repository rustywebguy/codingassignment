var React = require('react');
var BlogAppActions = require('../action/BlogActions');

var Forms = React.createClass({

    getInitialState: function() {
        return {
            header: '',
            body: ''
        };
    },

    handleChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
   
    render: function() {
        var header = this.state.header;
        var body = this.state.body;
        var response = this.props.response;

      	return (
            <div className="forms">
                <div className={"notify " + (this.props.response.action == 'Add' ? 'active' : '')}>
                    {this.props.response.message}
                </div>
                <h1>New Blog</h1>
                <p><input type="text" value={header} onChange={this.handleChange.bind(this, 'header')} placeholder="Header"/></p>
                <textarea value={body} onChange={this.handleChange.bind(this, 'body')} placeholder="Body"/>
                <p><button type="button" onClick={this._addBlog}>Add</button></p>
            </div>
        );

    },

    _addBlog: function(event){
        var newBlog = {
            header: this.state.header,
            body: this.state.body
        }

        BlogAppActions.addBlog(newBlog);
        this.replaceState(this.getInitialState());
    },

});

module.exports = Forms;
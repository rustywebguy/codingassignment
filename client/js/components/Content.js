var React = require('react');
var BlogAppActions = require('../action/BlogActions');

var Content = React.createClass({

    getInitialState: function() {
        return {
            id: '',
            editheader: '',
            editbody: ''        
        };
    },

    handleChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },

    render: function() {
        var self = this;
        var blogs = this.props.blogs;
        var edit = this.props.edit;
        var expanded = self.props.expanded;

      	return (
            <ul>
                {blogs.map(function(blog, index){

                    var datetime = new Date(blog.time);
                    blog.time = datetime.toString();

                    if(blog.body.length > 100)
                        blog.bodysub = blog.body.substring(0, 100)+ '...';
                    else
                        blog.bodysub = blog.body;
                    
                    return (
                        <li key={blog.id}>
                            <div className={"blog-main " + (edit.data != blog.id || edit.visible == false ? 'active' : '')}>
                                <button type="button" onClick={self._visibleEditBlog.bind(self, blog)} className="btn-topright remove-edit">&#9998;</button>
                                <button type="button" onClick={self._deleteBlog.bind(self, blog.id)} className="btn-topright remove-blog">&#10006;</button>
                                <span className="published">Published: {blog.time}</span>
                                <h1 className="title">{blog.header}</h1>
                                <p>{ (expanded.expand && expanded.id == blog.id ? expanded.body : blog.bodysub) }</p>
                                <button type="button" onClick={self._expandBody.bind(self, blog)} className="btn-mid">Read More</button>
                            </div>

                            <div className={"blog-main " + (edit.data == blog.id && edit.visible == true ? 'active' : '')}>
                                <p><input type="text" value={self.state.editheader} onChange={self.handleChange.bind(self, 'editheader')} placeholder="Header"/></p>
                                <textarea value={self.state.editbody} onChange={self.handleChange.bind(self, 'editbody')} placeholder="Body"/>
                                <p><button type="button" onClick={self._editBlog} className="btn-mid">Edit</button></p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        );
    },

    _deleteBlog: function(data){
        data = { data : data };
        BlogAppActions.removeBlog(data);
    },

    _expandBody: function(data){
        var formdata = {id: data.id, body: data.body, expand: true}
        BlogAppActions.expandBody(formdata);
    },

    _visibleEditBlog: function(data){
        this.setState({id: data.id, editheader: data.header, editbody: data.body});

        var formdata = {data: data.id , visible: true}
        BlogAppActions.editFormVisible(formdata);
    },

    _editBlog: function(){
        var editBlog = {
            id: this.state.id,
            header: this.state.editheader,
            body: this.state.editbody
        }
        BlogAppActions.editBlog(editBlog);

        var formdata = {data: null, visible: false}
        BlogAppActions.editFormVisible(formdata);
    },

});

module.exports = Content;
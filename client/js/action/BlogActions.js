var AppDispatcher = require('../dispatcher/AppDispatcher');
var BlogAppConstants = require('../constants/BlogAppConstants');

var BlogAppActions = {

  	getAllBlog: function(data) {
	    AppDispatcher.handleViewAction({
	      	actionType: BlogAppConstants.GET_BLOG
	    });
  	},

  	addBlog: function(data) {
	    AppDispatcher.handleViewAction({
	      	actionType: BlogAppConstants.NEW_BLOG,
	      	data: data
	    });
	},

	removeBlog: function(data) {
	    AppDispatcher.handleViewAction({
	      	actionType: BlogAppConstants.REMOVE_BLOG,
	      	data: data
	    });
	},

	editFormVisible: function(data){
		AppDispatcher.handleViewAction({
	      	actionType: BlogAppConstants.EDIT_FORM_VISIBLE,
	      	data: data
	    });
	},

	editBlog: function(data){
		AppDispatcher.handleViewAction({
	      	actionType: BlogAppConstants.EDIT_BLOG,
	      	data: data
	    });
	},

	expandBody: function(data){
		AppDispatcher.handleViewAction({
	      	actionType: BlogAppConstants.EXPAND,
	      	data: data
	    });
	}

};

module.exports = BlogAppActions;


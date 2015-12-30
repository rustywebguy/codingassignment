var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BlogAppConstants = require('../constants/BlogAppConstants');
var BlogApi = require('../utils/BlogApi');
var ObjectAssign = require('object-assign');

var CHANGE_EVENT = 'change';

var _blogs = [];
var _formVisible = {data: null, visible:false};
var _response = {};
var _expand = {id: null, expand:false, body: ''};

function loadBlogData(data) {
  	_blogs = data;
}

function addNewBlog(data){
	BlogApi.newBlog(data);
}

function editBlog(data){
	BlogApi.editBlog(data);
}

function deleteBlog(id){
	BlogApi.deleteBlog(id);
}

function loadServerResponse(data){
	_response = data;

	BlogApi.get();
}

function editFormVisible(data) {
  	_formVisible = data;
}

function expandBody(data) {
  	_expand = data;
}

var BlogAppStore = ObjectAssign( {}, EventEmitter.prototype, {

  	addChangeListener: function(cb) {
    	this.on(CHANGE_EVENT, cb);
  	},

  	removeChangeListener: function(cb) {
    	this.removeListener(CHANGE_EVENT, cb);
  	},

  	getAllBlog: function() {
    	return _blogs;
  	},

  	getResponse: function(){
  		return _response;
  	},

  	editVisible: function(){
  		return _formVisible;
  	},

  	isExpand: function(){
  		return _expand;
  	}

});

AppDispatcher.register(function(payload) {

  	var action = payload.action;

  	switch(action.actionType) {

	    case BlogAppConstants.NEW_BLOG:
	    	addNewBlog(action.data);
	      	BlogAppStore.emit(CHANGE_EVENT);
	      	break;

	    case BlogAppConstants.REMOVE_BLOG:
	      	deleteBlog(action.data)
	      	BlogAppStore.emit(CHANGE_EVENT);
	      	break;

	    case BlogAppConstants.GET_BLOG_RESPONSE:
	    	
	      	loadBlogData(action.response);
	      	BlogAppStore.emit(CHANGE_EVENT);
	      	break;

	    case BlogAppConstants.GET_SERVER_RESPONSE:

	    	loadServerResponse(action.response);
	    	BlogAppStore.emit(CHANGE_EVENT);
	      	break;
	    case BlogAppConstants.EDIT_FORM_VISIBLE:

	    	editFormVisible(action.data);
	    	BlogAppStore.emit(CHANGE_EVENT);
	      	break;
	    case BlogAppConstants.EDIT_BLOG:

	    	editBlog(action.data);
	    	BlogAppStore.emit(CHANGE_EVENT);
	    	break;
	    case BlogAppConstants.EXPAND:

	    	expandBody(action.data);
	    	BlogAppStore.emit(CHANGE_EVENT);
	    	break;
	    default:
	      	return true;
  	}
});

module.exports = BlogAppStore;
// Todo actions
var AppDispatcher = require('../dispatcher/AppDispatcher');
var BlogAppConstants = require('../constants/BlogAppConstants');

module.exports = {

  	getAllBlog: function(response) {
	    AppDispatcher.handleServerAction({
	      	actionType: BlogAppConstants.GET_BLOG_RESPONSE,
	      	response: response
	    });
  	},

  	getServerResponse: function(response){
  		AppDispatcher.handleServerAction({
	      	actionType: BlogAppConstants.GET_SERVER_RESPONSE,
	      	response: response
	    });
  	}
};


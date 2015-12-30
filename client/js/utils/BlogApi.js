
var BlogServerActions = require('../action/BlogServerActions');
var request = require('superagent');

module.exports = {

  	get: function() {
	    request.get('http://localhost:3000/blog/v1')
	      	.set('Accept', 'application/json')
	      	.end(function(err, response) {
	        	if (err) return console.error(err);

	        	BlogServerActions.getAllBlog(response.body);
	    	});
  	},

  	newBlog: function(data){
  		request.post('http://localhost:3000/blog/v1/create')
  			.send(data)
  			.set('Accept', 'application/json')
  			.end(function(err, response){
  				if (err) return console.error(err);

                BlogServerActions.getServerResponse(response.body);
  			});
  	},

    editBlog: function(data){
        request.post('http://localhost:3000/blog/v1/update')
            .send(data)
            .set('Accept', 'application/json')
            .end(function(err, response){
                if (err) return console.error(err);

                BlogServerActions.getServerResponse(response.body);
            });
    },

    deleteBlog: function(data){
        request.del('http://localhost:3000/blog/v1/delete')
            .send(data)
            .set('Accept', 'application/json')
            .end(function(err, response){
                if (err) return console.error(err);

                BlogServerActions.getServerResponse(response.body);
            });
    }
};


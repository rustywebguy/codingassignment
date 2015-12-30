var blogJson = require('../lib/main');

var blog = {
    getAll: function(req, res){
		blogJson.getAll(function(err, data){
			res.send(data);
		});
	},
	getById: function(req, res){
		blogJson.getBlogById(req.params.id, function(err, data){
			res.send(data);
		});
	},
	newBlog: function(req, res){
		if(req.body.header == '' || req.body.body == ''){
			res.send({success:false, action: 'Add', message:'Header and body is required!'})
		}else{
			blogJson.newBlog(req.body, function(err, data){
				res.send(data);
			});
		}
	},
	updateBlog: function(req, res){
		if(req.body.header == '' || req.body.body == ''){
			res.send({success:false, action: 'Edit', message:'Header and body is required!'})
		}else{
			blogJson.editBlogById(req.body, function(err, data){
				res.send(data);
			});
		}
		
	},
	deleteBlog: function(req, res){
		blogJson.deleteBlogById(req.body.data, function(err, data){
			res.send(data);
		});
	}
}

module.exports = blog;
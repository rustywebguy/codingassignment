
var fs 			= require('fs');
var file 		= './data/blog.json';

function writeData(data, action, callback){
	fs.writeFile(file, data, function(err){
		if(err) console.log(err);
		callback(null, {action: action, message: action+' blog succesful!'});
	});
}
function readData(callback){
	fs.readFile(file, 'utf8' , function(err, data){
		data = JSON.parse(data);
		callback(err, data);
	});
}

var jsonBlog = {
	getAll: function(callback){
		readData(function(err, data){ 
			if (err) console.log(err);

			callback(err, data);
		});
	},
	getBlogById: function(id, callback){
		readData(function(err, data){
			if (err) console.log(err);

			if(data.hasOwnProperty(id)){
				callback(err, data[id]);
			}
		});
	},

	newBlog: function(newData, callback){
		readData(function(err, data){
		    if (err) console.log(err);

	    	newData.id = data.length + 1;
	    	newData.time = new Date();

	    	data.push(newData);

	    	writeData(JSON.stringify(data),'Add', function(err, data){
	    		callback(err, data);
	    	});
		});
	},

	editBlogById : function(formdata, callback){

		readData(function(err, readData){
		    if (err) console.log(err);

		    for (var i = 0; i < readData.length; i++) {
		    	
		    	if(readData[i].id == formdata.id){
		    		readData[i].header = formdata.header;
		    		readData[i].body = formdata.body;
		    		readData[i].time = new Date();
		    	}
		    }

		    writeData(JSON.stringify(readData),'Edit',function(err, data){
	    		callback(err, data);
	    	});
		});
	},
	deleteBlogById : function(id, callback){

		readData(function(err, readData){
		    if (err) console.log(err);

		    for (var i = 0; i < readData.length; i++) {
		    	
		    	if(readData[i].id == id){
		    		readData.splice(i, 1);
		    	}
		    }

		    writeData(JSON.stringify(readData),'Delete',function(err, data){
	    		callback(err, data);
	    	});
		});
	}
}

module.exports = jsonBlog;
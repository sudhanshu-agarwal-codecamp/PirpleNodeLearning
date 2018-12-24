


var http=require('http');
var url=require('url');
var stringDecoder=require("string_decoder").StringDecoder;


console.log("In index.js")



var httpServer =http.createServer(function(req,res){
	globalHandler(req,res)

});

//define handlers
var handlers={};
handlers.notFoundHandler=function(data,callback){
	callback(404,{response:"Not Found"});
};
handlers.helloHandler=function(data,callback){
	callback(200,{response:"Hello World"});
};


//define routes
var routes={};
routes.hello=handlers.helloHandler;
routes.notFound=handlers.notFoundHandler;

var globalHandler= function(req,res){
	
	//parse request url
	var parsedUrlObject=url.parse(req.url,true);

	//extracting request path
	var path = parsedUrlObject.pathname;
	var req_Path=path.replace(/^\/+|\/+$/g,'');
	console.log("Request Path "+req_Path);

	//extracting request method
	var req_method=req.method;
	console.log("Request Method "+req_method);

	// extracting query object
	var req_query_object=typeof(parsedUrlObject.query)=='Object'?parsedUrlObject.query:{};
	console.log("Request query object ",req_query_object);

	//extracting request headers
	var req_headers=req.headers;
	console.log("Request query headers ",req_headers);

	console.log("routes",routes);
	
	console.log("typeof(req_Path)!=='undefined'",typeof(routes[req_Path]));


	var reqHandler= typeof(routes[req_Path])!=='undefined'?routes[req_Path]:routes.notFound;
	console.log(reqHandler);

	var data={
		'path':req_Path,
		'method':req_method,
		'queryObject':req_query_object,
		'headers':req_headers,

	};

	reqHandler(data,function(statusCode,payload){
		var status=typeof(statusCode)=='numeric'?statusCode:200;
		var response= typeof(payload)=='object'?payload:{};
		res.writeHead(statusCode);
		res.end(JSON.stringify(response));
	});

}

httpServer.listen(3000,function(){
	console.log("we are listening on port 3000");
});





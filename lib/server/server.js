var http = require('http');
var debug = require("../debug/debug.js")("../log/application_log.txt");
var express = require("express");
var app = express();

function start()
{
    http.createServer(app).listen(8080);
    app.configure(function(){
       app.use(function(err, req, res, next){
           debug(err.stack);
       });
	   app.use(express.bodyParser());
	   app.use(app.router);
    });

	app.get("/admin/:controller/:action?",methodExistFilter(),function(req,res)
	{
		var controller = req.params.controller;
		var action = (req.params.action) ? req.params.action : "index";
		debug("Load Controller: "+controller+" Action "+action);
		require("../../application/module/"+controller+"/"+controller+".js")[action](req,res);
		//require(controller)[action](req,res);
	});
	app.get("*",function(req,res)
	{
		res.send("Für diese Anfrage existiert kein Pfad");
	});
}
console.log("Server running at http://127.0.0.1:8080/");
module.exports.start = start;

/**
*this function check if ther ist a method in this controller, that ist requested
*/
var methodExistFilter = function()
{
	return function(req,res,next)
	{
		var controller = req.params.controller;
		var action = (req.params.action) ? req.params.action : "index";
		var controllerObj = require("../../application/module/"+controller+"/"+controller+".js");
		if(!controllerObj.allowedMethods[action])
		{
			var err = "This Method ("+action+") is not allowed to use or does not exist";
			//debug(err);
			return next(err);
		}
		
		next();	
	};
};

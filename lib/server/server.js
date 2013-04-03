var http = require('http');
var debug = require("../debug/debug.js")("../log/application_log.txt");
var express = require("express");
var app = express();

function start()
{
    http.createServer(app).listen(8080);
    app.configure(function(){
        var view_path = __dirname+"/../../views"; 
        var public_path = __dirname+"/../../public";
        app.set("views",view_path); debug("Gesetzt: "+app.get("views"));
        app.set("view engine","jade");
        app.set('view options', { layout: false });
        app.use(express.bodyParser());
        app.use(app.router);        
        app.use(function(err, req, res, next){
           debug(err.stack);
           res.end("Error");
        });

    });
    app.get("/admin/:controller/:action?",methodExistFilter(),function(req,res)
    {
            /*
             *Aufrufen des richtigen Controllers
             *Hier später noch eine Weiche rein, wenn controller nicht belegt ist, dass man auf eine Startseite gelangt, 
             *also den Controller Optional machen
             */
            var controller = req.params.controller;
            var action = (req.params.action) ? req.params.action : "index";
            debug("Controller: "+controller+" Action: "+action); 
            var controllerResult = require(controller)[action](req,res);
            
            //Read adminNavigation
            var adminNavigation = new require("admin_navigation")(req,res);
            var adminFooter = new require("admin_footer")(req,res);
            var navigation = adminNavigation();
            var finalContent = {
                "navigation" : navigation,
                "content"    : controllerResult,
                "footer"     : adminFooter()
            }; 
            res.render("adminIndex",finalContent); 
            


    });
    app.get("*",function(req,res)
    {
            res.send("Fuer diese Anfrage existiert kein Pfad");
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
		var controllerObj = require("../../application/node_modules/"+controller+"/"+controller+".js");
		if(!controllerObj.allowedMethods[action])
		{
			var err = "This Method ("+action+") is not allowed to use or does not exist";
			//debug(err);
			return next(err);
		}
		
		next();	
	};
};

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
        app.use(function(err, req, res, next){
           debug(err.stack);
           res.render("adminError",{"error":err.stack});
        });
        app.use(express.bodyParser());
        app.set("views",view_path); 
        app.set("view engine","jade");
        app.set('view options', { layout: false });
        app.use(app.router); 
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
            var Result = require(controller)[action](req,res);
            
            //Read adminNavigation
            var adminNavigation = new require("admin_navigation")(req,res);
            var adminFooter = new require("admin_footer")(req,res);
            var navigation = adminNavigation();
            
            //Warten bis eine Antwort kommt
            Result.on("module_ready",function(data){
               var finalContent = {
                    "navigation" : navigation,
                    "content"    : data,
                    "footer"     : adminFooter()
                };
                switch(action)
                {
                    case 'index':
                    case 'list':
                        var renderFile  = 'adminList';
                        break;
                   case 'edit':
                   case 'create':
                       var renderFile = "adminEdit";
                       break;
                   default:
                       var renderFile = "navfoot";
                       break;

                }
                res.render(renderFile,finalContent);                 
            });


            


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
    return function(req,res,next,err)
    {
        var controller = req.params.controller;
        var action = (req.params.action) ? req.params.action : "index";
        var controllerObj = require("../../application/node_modules/"+controller+"/"+controller+".js");
        if(!controllerObj.allowedMethods[action])
        {
            var err = err + "\n\ This Method ("+action+") is not allowed to use or does not exist";
            debug("ErrorMessage: "+err);
            return next(err);
        }

        next();	
        
    };
};

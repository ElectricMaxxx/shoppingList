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
    });
    app.get(/^\/admin/,function(req,res){
      var body = 'Adminbereich';
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', body.length);
      res.end(body);
            
    });
    app.get('*', function(req, res){
      var body = 'Hello World';
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', body.length);
      res.end(body);
    });
}
console.log("Server running at http://127.0.0.1:8080/");
module.exports.start = start;
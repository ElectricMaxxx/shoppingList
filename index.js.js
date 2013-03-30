var bootstrap = require('lib/bootstrap/bootstrap.js');
var server = require('lib/server/server.js');
bootstrap(function(){
   server.start(); 
});


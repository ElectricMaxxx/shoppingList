/* 
 * I have to add a lot of more things in this bootstrap, want to go fast to application
 */
var url = require("url");
var debug = require("../debug/debug.js")("../log/application_log.txt");
var moduleConfig = require("../../config/module.json");
var moduleloader = require("../moduleloader/moduleloader.js");
var couchViewLoader = require("../couch/couchViewLoader.js");


var bootstrap = 
{   "error"         : false,
    'start'         : function(func)
    {
        //Alle Module laden, die später mal aufgerufen werden können
        var ModuleLoader = new moduleloader(moduleConfig);
        var res = ModuleLoader.load();
        if(!res)
            {
                this.error = true;
                debug("An error occured by trying to load the mudules");
                return this.error;
            }
        //Alle Views für CouchDB laden
        var couchView = new couchViewLoader();
        couchView.load("../../couch_view/");
        
        //Einstellungen für forever laden
        foreverLoad();
        func(); //Ausführen es nächsten Schrits
        
    }
};
module.exports = bootstrap;

/**
*Hier kommen dann die Einstellungen (log,..) für forever rein
*/
var foreverLoad = function()
{
  var forever = require('forever');
  
};



/* 
 * I have to add a lot of more things in this bootstrap, want to go fast to application
 */
var url = require("url");
var debug = require("../debug/debug.js")("../log/application_log.txt");
var moduleConfig = require("../../config/module.json");
var moduleloader = require("../moduleloader/moduleloader.js");


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
        func(); //Ausführen es nächsten Schrits
        
    }
};
module.exports = bootstrap;



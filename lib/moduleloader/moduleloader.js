/* 
 *this is my first moduleloader. It needs a json with a config- or starting situation
 */
var debug   = require("../debug/debug.js")("../log/application_log.txt");
var fs      = require("fs");
function moduleloader(config)
{
        this.moduleConfig = new Array();
        this.start_path = "../../application/node_modules/";
        this.module_path = new Array();
        var that = this;
        if(config.length !== 0)
            {
                this.moduleConfig = config;
            }
        this.load = function()
        {
            makeRequire(this.moduleConfig,process);
            return true;
        };

        var makeRequire = function(o,func)
        {
            for (var i in o) 
            {
                if(o[i])
                    {
                        require(i);
                    }
            }
        };

};
module.exports = moduleloader;


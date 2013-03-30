/* 
 *this is my first moduleloader. It needs a json with a config- or starting situation
 */
var debug = require("../debug/debug.js")("../log/application_log.txt");
function moduleloader(config)
{
        this.moduleConfig = new Array();
        this.start_path = "../../application/module/";
        this.module_path = new Array();
        var that = this;
        if(config.length !== 0)
            {
                this.moduleConfig = config;
            }
        this.load = function()
        {
            //console.log(this.moduleConfig);
            getPath(this.moduleConfig,process);
            makeRequire();
            return true;
        };
        
        var makeRequire = function()
        {
            
            for(var i in that.module_path)
                {
                    require(that.start_path + that.module_path[i]);
                    debug("Module: " + i + " loaded.");
                }
        }
        
        function process(key,value)
        {
            that.module_path[key] = value;
        }

        var getPath = function(o,func)
        {
            for (var i in o) 
            {
                if(typeof(o[i]) == "object")
                    {
                        getPath(o[i],func);
                    }
                if(typeof(o[i].path) != "undefined")
                    {
                        func(i,o[i].path);

                    }
            }
        }

};

module.exports = moduleloader;


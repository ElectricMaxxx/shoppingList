var debug = require("../debug/debug.js")("../log/application_log.txt");
var cradle = require("mycradle");
var fs = require("fs");
var couchViewLoader = function()
{
	this.viewDir = null;
        this.view = {};
        var that = this;
	this.load = function(viewDir)
	{
		if(viewDir)
		{
                    that.viewDir = __dirname+"/"+viewDir;
                    //Than i will load all Files from this dir to an view with the same name
                    fs.readdir(this.viewDir,function(err,files){
                       if(err)
                           throw(err);
                       if(files.length)
                        {
                            for(i in files)
                            {
                                insertView(files[i],that.viewDir);
                            }
                        }
                        var db = new cradle();
                        db.save("_design/shoppinglist",{
                            views: that.view
                        });
                    });
                    
		}
	};
        var insertView = function(filename,dir)
        {
                var view = require(that.viewDir+"/"+filename);
                var viewname = filename.substring(0,filename.lastIndexOf("."));
                that.view[viewname] = view;         
        };
        
};
module.exports =couchViewLoader;
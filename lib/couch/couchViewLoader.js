var debug = require("../debug/debug.js")("../log/application_log.txt");
var couchViewLoader = function()
{
	this.viewDir = null;
	this.load = function(viewDir)
	{
		if(viewDir)
		{
			this.viewDir = viewDir;
		}
		debug("Ich bin erst einmal im Modul, und mir wurde übergeben "+this.viewDir);
	}
}
module.exports =couchViewLoader;
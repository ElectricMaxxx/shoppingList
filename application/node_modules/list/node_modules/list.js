var model = require("./model/listModel.js");


var list =
{
	"index" : function(req,res)
	{
		var Model = new model(req,res);
                Model.index();
	},
	"create" : function(req,res)
	{
		var Model = new model(req,res);
                Model.create();
	},
	"allowedMethods" : {"index":true,"create":true}
}
module.exports = list;



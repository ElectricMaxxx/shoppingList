var list =
{
	"index" : function(req,res)
	{
		res.send("index im ListController");
	},
	"create" : function(req,res)
	{
		res.send("create im ListController");
	},
	"allowedMethods" : {"index":true,"create":true}
}
module.exports = list;



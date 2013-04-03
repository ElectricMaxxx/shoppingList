var rezept =
{
	"index" : function(req,res)
	{
            res.send("index im Rezept");
	},
	"create" : function(req,res)
	{
            res.send("create im Rezept");
	},
	"allowedMethods" : {"index":true,"create":true}
};

module.exports = rezept;


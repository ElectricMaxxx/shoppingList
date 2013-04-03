
function listModel(req,res)
{
    this.req = req;
    this.res = res;
    var that = this;
    
    this.index = function()
    {
        res.send("index im ListModel()");
    }
    
    this.create = function()
    {
        res.send("create im ListModel()");
    }
}

module.exports = listModel;


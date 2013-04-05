var util = require('util');
var cradle = require("mycradle");
var event = require("events").EventEmitter;
var helper = new (require("helper"));
function  model(req,res)
{
    this.db = new cradle();
    this.table = new (helper.table);
    this.debug = helper.debugger();
    
    this.result = 
            {
                "form":[],
                "list":[]
            };     
    /**
     * I need this function to tell the app, that the model ist ready 
     * by this i send the data back to the app and it can be rendered
     * @argument {obj} data wird übergeben
     */
    this.exports = function(data)
    {
        this.emit("module_ready",data);
    };
    
};
util.inherits(model,event);
module.exports = model;
var table = require("./table.js");
var debug = require("../debug/debug.js")("../log/application_log.txt");
function helper()
{
    this.table = function()
    {
        return table;
    };
    this.debugger = function()
    {
        
      return debug;  
    };
}
module.exports = helper;


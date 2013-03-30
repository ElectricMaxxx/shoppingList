/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var fs = require("fs");
function debug(file)
{
    var file = file;
    var message = null;
    var debugLog = function()
    {
    };
    var debugConsole = function()
    {
      console.log( message);   
    };
    
    return  function(msg)
    {
        message = msg;
        var debugMode = "console";
        switch(debugMode)
        {
            case "console":
                debugConsole();
                break;
            case "log":
                debugLog();
                break;
        }
    };
}
module.exports = debug;



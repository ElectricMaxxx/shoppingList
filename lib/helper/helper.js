var table = require("./table.js");

function helper()
{
    this.table = function()
    {
        return table;
    };
}
module.exports = helper;


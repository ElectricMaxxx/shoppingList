var cradle = require("cradle");
var db = new(cradle.Connection)("http://localhost",5984).database("shoppinglist");

var cradleAdapter = function()
{
    return db;
}

module.exports = cradleAdapter;



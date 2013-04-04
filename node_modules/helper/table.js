/**
 * Diese Funktion soll mir miene Tabelle für die Übersicht bereitstellen
 * Dabei wird noch kein HTML-Code erzeugt, sondern nur ein Object, welches dann in einem 
 * View ausgearbeitet wird
 * @returns {table}
 */
function table()
{
    var line = [];
    var path = [];
    var head = [];
    var option = [];
    var table = new Array();
    var allowedOption = {"edit":true,"delete":true,"activate":true,"deactivate":true,"copy":true};
    this.create = function(options)
    {
        if(options.path)
            path = options.path;
        addHeadToTable(options);
        addOption(options);
        if(options.data && options.data.length!=0)
        {
            buildTable(options);
            return table;
        }
        else
            {
                return false;
            }
        
    };
    
    var addOption = function(options)
    {
        if(options.option && options.option.length != 0)
        {
            for(i in options.option)
            {
                if(allowedOption[options.option[i]])
                {
                    option.push(options.option[i]);
                    allowedOption[options.option[i]] = false; //Damit eine Option nur einmal vorkommt
                }
            }
        }
    };
    var addHeadToTable = function(options)
    {
        if(options.head && options.head.length != 0)
        {
            for(i in options.head)
            {
                head.push(options.head[i]);
            }
            if(option.length!=0)
            {
                head.push("Optionen");
                if(options.option.create)
                {
                    head.push({"type":"options","content":[{"label":"create","path":path}]});
                }
                
            }
        }
    };
    var buildTable = function(options)
    {
        table.push(head);
        for(i in options.data)
            {
                var tmplArr = options.data[i];
                if(option.length != 0 && options.data[i]._id)
                    {
                        tmplArr.push(getLineOption(options.data[i]._id));
                    }
                table.push(tmplArr);
            }
    };
    var getLineOption = function(id)
    {
        var tpl = {"type":"options","content":[]};
        for(i in option)
            {
                tpl.content.push({"label":option[i],"path":path+option[i]+"/"+id});
            }
         return tpl;
    };
    

}
module.exports = table;



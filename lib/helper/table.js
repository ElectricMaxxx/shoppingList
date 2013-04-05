/**
 * Diese Funktion soll mir miene Tabelle für die Übersicht bereitstellen
 * Dabei wird noch kein HTML-Code erzeugt, sondern nur ein Object, welches dann in einem 
 * View ausgearbeitet wird
 * @returns {table}
 */
function table()
{
    var line = [];
    var tableOptions  = null;
    var path = null;
    var head = [];
    var option = [];
    var table = new Array();
    var that = this;
    var allowedOption = {"edit":true,"delete":true,"activate":true,"deactivate":true,"copy":true,"create":true};
    
    this.create = function(options)
    {
        tableOptions = options;
        
        if(tableOptions.path)
            path = tableOptions.path; 
        addOption();
        addHeadToTable();
        
        if(tableOptions.data && tableOptions.data.length!=0)
        {
            buildTable();
            return table;
        }
        else
        {
            return false;
        }
        
    };
    
    var addOption = function ()
    {
        if(tableOptions.option && tableOptions.option.length != 0)
        {
            for(i in tableOptions.option)
            {
                if(allowedOption[i])
                {
                    option.push(i);
                    allowedOption[i] = false; //Damit eine Option nur einmal vorkommt
                }
            }
        }
    };
    var addHeadToTable = function()
    {
        if(tableOptions.head && tableOptions.head.length != 0)
        {
            for(i in tableOptions.head)
            {
                head.push(tableOptions.head[i]);
            }
            
            if(option.length != 0)
            {
                head.push("Optionen");
                if(tableOptions.option.create)
                {
                    head.push({"type":"options","content":[{"label":"create","path":path+"create"}]});
                }
                
            }
        }
    };
    
    var buildTable = function()
    {
        table = new Array();
        table.push(head);
        for(i in tableOptions.data)
            {
                var tmplArr = new Array();
                //Jeden Datensatz der Zeile hinzufügen
                if(tableOptions.data[i].row && tableOptions.data[i].row.length!=0)
                    {
                        for(j in tableOptions.data[i].row)
                        {
                            tmplArr.push(tableOptions.data[i].row[j]);
                        }
                    }
                if(option.length != 0)
                {
                    if(tableOptions.data[i]._id)
                    {
                        var optionCol = getLineOption(tableOptions.data[i]._id,tableOptions.data[i]._active); 
                        tmplArr.push(optionCol);
                        //If ther is a create-button i will ad an other col
                        
                        if(tableOptions.option.create)
                            {
                                tmplArr.push(" ");
                            }
                    }
                    else
                    {
                        throw("TableBuilder: You should give me an _id if you want me to make options");
                    }
                    
                }
                table.push(tmplArr);
                tmplArr = [];
            }
    };
    var getLineOption = function(id,active)
    {
        var tpl = {"type":"options","content":[]};
        for(i in option)
            {
                if(option[i]!="create")
                    tpl.content.push({"label":option[i],"path":path+option[i]+"/"+id});
                if(option[i]=="active")
                {
                    if(active != "undefined")
                    {
                        tpl.content.push({"label":option[i],"path":path+option[i]+"/"+id,"active":active});
                    }
                    else
                    {
                        throw("TableBuilder: You should give my the activation-state if you want my to build an activationlink");
                    }
                    
                }
                
            }
         return tpl;
    };
    

}
module.exports = table;



var allList = 
{
    "map"   : function(doc)
    {
        if(doc.type == "list")
            {
                emit(null,doc);
            }
    }
//    "reduce" : function(keys,values, rereduce)
//    {
//        for(i in values)
//            {
//                var countList = 0;
//                if(values[i].content && values[i].content.length!=0)
//                    {
//                        
//                    }
//            }
//            //emit(key,values)
//        if(value.length > 0)
//            {
//                for(i in values)
//                    {
//                        var countList = 0;
//                        if(values[i].content)
//                            {
//                                countList = values[i].content.length;
//                                    
//                            }
//                        values[i].countList = countList;
//                    }
//            }
//
//    }       
};

module.exports = allList;
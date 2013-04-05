var assert = require("node-assertthat");

var helper = new (require("helper"))
  , table = new(helper.table)
  , data = new Array({"row":[1,1],"_id":1,"_active":0},{"row":[1,1],"_id":1,"_active":0})
  , dataWithoutActivationState = new Array({"row":[1,1],"_id":1},{"row":[1,1],"_id":1})
  , head = new Array("Name","Test")
  , option = {"edit":true,"delete":true}
  , optionWithCreate = {"edit":true,"create":true,"delete":true}
  , optionWithActivate = {"edit":true,"create":true,"delete":true,'active':true}
  , path = "mypath/";
suite("Test the tableBuilder",function(){
    test("Returns no Error",function(){
        var t = new table();

        var actual = t.create({"data":data});
        assert.that(actual,is.not.false());

    });
    test("Should return no Error with head", function(){
       var t = new table();
       var actual = t.create({"data":data,"head":head});
       assert.that(actual,is.not.false());
    });

    test("Should have minimum a head",function(){

        var t = new table();
        var result = t.create({"data":data,"head":head}); 
        var actual = result[0]; 
        var expected = new Array("Name","Test");
        assert.that(actual,is.equalTo(expected));
    });

    test("Should have a OptionCol with them inside",function(){
        var t = new table();
        var result= t.create(
                {
                    "data":data,
                    "head":head,
                    "option":option
                });
        var actual = result[0];
        var expected = new Array("Name","Test","Optionen");
        assert.that(actual,is.equalTo(expected));

    });    
    test("Should have a create-new button",function(){
       var t = new table();
       var result = t.create(
               {
                    "data"  : data,
                    "head"  : head,
                    "option": optionWithCreate
               }
           );
       var actual = result[0][3]; //console.log(actual);
       var expected = {"type":"options","content":[{"label":"create","path":null}]}; //console.log(expected);
       assert.that(actual, is.equalTo(expected));
    });
    test("Should have the right base path in TableHead",function(){
       var t = new table();
       var result = t.create(
               {
                    "data"  : data,
                    "head"  : head,
                    "path"  : path,
                    "option": optionWithCreate
               }
           );
       var actual = result[0][3].content[0].path; //console.log(actual);
       var expected = "mypath/";
       assert.that(actual, is.equalTo(expected));        
    });
    
    test("Should have option links",function(){
       var t = new table();
       var result = t.create(
               {
                    "data"  : data,
                    "head"  : head,
                    "path"  : path,
                    "option": optionWithCreate
               }
           );
       var actual = result[1][2];
       var expected = {"type":"options","content":[{"label":"edit","path":path+"edit/1"},{"label":"delete","path":path+"delete/1"}]};
       assert.that(actual, is.equalTo(expected));        
    }); 
    test("Cols of head should be the same as the cols of the body",function()
    {
       var t = new table();
       var result = t.create(
               {
                    "data"  : data,
                    "head"  : head,
                    "path"  : path,
                    "option": optionWithCreate
               }
           );
       var actual = result[0].length;
       var expected = result[1].length;
       assert.that(actual, is.equalTo(expected));
    });
    
    test("Shoul throw an Exeption, when activation state is missing",function(){
       var t = new table();
       assert.that(t.create(
               {
                    "data"  : dataWithoutActivationState,
                    "head"  : head,
                    "path"  : path,
                    "option": optionWithActivate
               }
           ),is.throwing());
        
    });
});

    
    


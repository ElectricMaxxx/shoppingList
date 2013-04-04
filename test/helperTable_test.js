var assert = require("node-assertthat");

var helper = new (require("helper"))
  , table = new(helper.table)
  , data = new Array([1,1],[2,2])
  , head = new Array("Name","Test")
  , option = new Array("edit","delete");

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

test("Should have a Optionrow with them inside",function(){
    var t = new table();
    var result= t.create(
            {
                "data":data,
                "head":head,
                "option":option
            });
    var actual = result[0];
            console.log(actual);
    var expected = new Array("Name","Test","Option");
    assert.that(actual,is.equalTo(expected));
            
});
    
    


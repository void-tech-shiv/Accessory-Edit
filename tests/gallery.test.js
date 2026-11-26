const {test}=require("node:test");const assert=require("node:assert/strict");const {filterProducts}=require("../gallery.js");
const rows=[{name:"Watch",description:"Classic",category:"Accessories",price:4999},{name:"Scarf",description:"Silk",category:"Accessories",price:2499},{name:"Necklace",description:"Pendant",category:"Jewellery",price:2999}];
test("case insensitive search and description",()=>{assert.equal(filterProducts(rows," WATCH ")[0].name,"Watch");assert.equal(filterProducts(rows,"silk")[0].name,"Scarf");});
test("category and empty results",()=>{assert.equal(filterProducts(rows,"","Jewellery").length,1);assert.equal(filterProducts(rows,"missing").length,0);});
test("sort both directions without mutating input",()=>{assert.equal(filterProducts(rows,"","All","low")[0].name,"Scarf");assert.equal(filterProducts(rows,"","All","high")[0].name,"Watch");assert.equal(rows[0].name,"Watch");});

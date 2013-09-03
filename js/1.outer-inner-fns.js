

function outer(){
test("|----- OUTER START -----|");
var a = 'stringA';
if(a){
var b = 'stringB';
}
test("out of if");
function inner(){
	var c = 'stringC';
	test('inner function');
}
test('end inner');
}

function test(description){
	assert(true,description);
	assert(typeof outer==='function', "outer() is in scope");
	assert(typeof inner==='function', "inner() is in scope");
	assert(typeof a==='number',"a is in scope");
	assert(typeof b==='number',"b is in scope");
	assert(typeof c==='number',"c is in scope");
}
window.onload = function() {
test("|----- BEFORE OUTER -----|");
outer();
};


/**
* outer function
* return {void}
*/
function outer() {
    assert(typeof outer === 'function', "outer() is in scope");
    assert(typeof a === 'number', "a is in scope");
    /**@type{number}*/
    var a = 5;
    if (a === 5) {
        /**@type{string}*/
        var b = 'stringB';
    }
    assert(typeof b === 'number', "b is in scope");

    /**
    * outer function
    * return {void}
    */

    function inner() {
        /**@type{string}*/
        var c = 'stringC';
    }

    assert(typeof c === 'number', "c is in scope");
}

window.onload = function () {
    outer();
};

/**
* assert function
* @param {boolean} value. Is description true
* @param {string} desc. Description of test
*/
function assert(value, desc) {
    /**@type{Element}*/var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    document.getElementById("results").appendChild(li);
}
window.onload = function() {
    assert(true, "The test suite is running.");
    assert(false, "Fail!");
};
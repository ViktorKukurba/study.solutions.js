var xmlhttp = null;
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
}
else
{// code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

var url = "index.html";
var params = "var=1";
xmlhttp.open("POST", url, true);
xmlhttp.send(params);
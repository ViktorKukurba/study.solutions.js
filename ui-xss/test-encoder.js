var JSON_DATA = {
    image: 'Text<img src="resources/images/icon-models.png" style="width: 25px;" title="Models">'
};

$(document).ready(function () {
    console.log($.encoder);
    var $body = $('body');
    $('<div></div>').appendTo($body)[0].innerHTML = JSON_DATA.image;
    $('<div></div>').appendTo($body)[0].innerHTML = $.encodeForHTML(JSON_DATA.image);
})
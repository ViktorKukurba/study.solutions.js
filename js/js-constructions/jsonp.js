/**
 * Created by viktor on 24.12.13.
 */

var showResponse = function(data){
    console.log(data);
}
window.onload = function(){
    //jQuery ajax cross domain request (jsonp)
    jQuery.ajax({
        type: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk',
        dataType: 'jsonp',
        success: showResponse
    });
    //javascript ajax cross domain request (jsonp)
    var script = document.createElement('script');
    script.src = "http://api.openweathermap.org/data/2.5/weather?q=Lviv,ua&callback=showResponse";
    document.getElementsByTagName('head')[0].appendChild(script);

    setTimeout(function(){
        document.getElementsByTagName('head')[0].removeChild(script);


        var script1 = document.createElement('script');
        script1.src = "http://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&callback=showResponse";
        document.getElementsByTagName('head')[0].appendChild(script1);
        document.getElementsByTagName('head')[0].removeChild(script1);
    },1000);
}
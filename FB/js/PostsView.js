
/**
* @constructor PostsView
* @param {Node|Element} container
*/
function PostsView(container) {
    var TEMPLATE = '<article><header><h2>{{name}}</h2></header></section>' +
        '<img src="{{picture}}"/>'+
        '<div class"message">{{message}}</div>' +
        '<div class"description">{{description}}</div>' +
        '</section>'+
        '<footer>{{created_time}}<footer></article>';

    this.render = function (data) {
        var html = '';
        if (data && data instanceof Array) {
            data.forEach(function (value) {

                value.created_time = (new Date(value.created_time)).toLocaleDateString();
                html += Mustache.render(TEMPLATE, value);
            });
            container.innerHTML = html;
        }
    };
}

/**
* @constructor HeaderView
* @param {Node|Element} container
*/
function HeaderView(container) {
    var TEMPLATE = '<img src="{{cover.source}}"/>' +
        '<h4>{{description}}</h4>';

    this.render = function (data) {
        var html = Mustache.render(TEMPLATE, data);
        document.getElementById('title').innerHTML =data.about;
        container.innerHTML = html;
    };
}

/**
* @constructor PostsView
* @param {Node|Element} container
*/
function PostsView(container) {
    var TEMPLATE = '<article><header><h2>{{name}}</h2></header></section>' +
        '<img src="{{picture}}"/>'+
        '<div class"message">{{message}}</div>' +
        '<div class"description">{{description}}</div>' +
        '<div class="photos">' +
        '{{#photos}}' +
        '<a tabindex="1"><img src="{{source}}"/></a>' +
        '{{/photos}}'+
        '<span class="closed">+</span>'+
        '<span class="closed-layer"></span>'+
        '</div>'+
        '</section>'+
        '<footer>{{start_time}}<footer></article>';

    this.render = function (data) {
        container.innerHTML = '';
        if (data && data instanceof Array) {
            data.forEach(function(item) {
                var eventDiv = container.appendChild(document.createElement('DIV'));
                eventDiv.id = item.id;

                FB.api('/' + item.id, function(event) {
                    FB.api('/' + item.id + '/picture', function(picture) {
                        FB.api('/' + item.id + '/photos', function(photos) {
                            event.start_time = (new Date(event.start_time)).toLocaleDateString();
                            event.picture = picture.data.url;
                            event.photos = photos.data;
                            console.log('photos', photos);
                            var html = '';
                            html = Mustache.render(TEMPLATE, event);
                            document.getElementById(item.id).innerHTML = html;
                        });
                    });
                });

            });
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
        document.getElementById('title').innerHTML = data.about;
        container.innerHTML = html;
    };
}
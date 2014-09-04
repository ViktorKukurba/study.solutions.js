
/**
 * @constructor PostsView
 * @param {Node|Element} container
 */
function SharesView(container) {
  var TEMPLATE = '<article><header><h2>Sharings</h2></header></section>' +
    '<div class="page-name">'+
    '<label>Page</label><input type="text" value="Fredra.61">'+
    '</div>'+
    '<div class="resource-selection">'+
    '<label>Resource</label><select id="types">'+
    '<option value="posts">Posts</option>'+
    '<option value="events">Events</option>'+
    '</select></div>'+
    '<div><button>Load</button></div>',

    LIST_TEMPLATE = '<select id="items-list">' +
      '{{#.}}<option value="{{id}}">{{message}}</option>{{/.}}' +
      '</select>',
    SHARED_LIST = '<div id="shares"><ul>' +
      '{{#.}}<li value="{{id}}">{{name}}</li>{{/.}}' +
      '</ul></div>',
    _list;


  function init() {
    var $container =  $(container);
    $container.html(TEMPLATE);
    $container.find('button').on('click', function(){
      var page =  $container.find('input[type=text]').val(),
        method = $container.find('#types').val();

      FB.api('/'+ page + '/' + method, { limit: 250 }, function (responce) {
        _list = responce.data.filter(function(item){
          return !!item.message;
        });
        console.log('Response', _list);
        $('#items-list').remove();
        $container.append(Mustache.render(LIST_TEMPLATE, _list));
      });

    });
    $container.on('change', '#items-list', function(evt){
      $('#shares').remove();
      var val = $('#items-list').val();
      var shares = _list.filter(function(item){
        return item.id == val;
      });
      console.log('r', shares);
      if(shares[0].to){
        $container.append(Mustache.render(SHARED_LIST, shares[0].to.data));
      }

//      FB.api('/'+ $('#items-list').val() + '/sharedposts', function (responce) {
//        console.log('Response', responce);
//      });
    });
  }

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

  init();
}
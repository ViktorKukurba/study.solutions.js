function TabContainer(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        var li = $('<li class="active"><a href="../sammyjs/index.htm#1/' + tabs[i]['name'] + '">' + tabs[i]['title'] + '</a></li>').appendTo($('ul.tab-menu'));
        li.on('click', function () {
            $('#tab-container li').removeClass('active');
            $(this).addClass('active');
        });
    }
}

function FcWidget($container) {
    this.show = function () {
        this.container.addClass('tab-content');
        this.container.show();
    };

    this.hide = function () {
        this.container.removeClass('tab-content');
        this.container.hide();
    };


    this.container = $container;
}

function FcKarpatyWidget() {
    FcWidget.apply(this, arguments);
    this.container.append('<h1>FC Karpaty Lviv<h1>');
    var img = $('<img src="../img/fc_karpaty.gif"/>').appendTo(this.container);
    img.on('click', function () {
        alert('Karpaty Logo !');
    });
}

function FcDniproWidget() {
    FcWidget.apply(this, arguments);
    this.container.append('<h1>FC Dnipro Dnipropetrovsk<h1>');
    var img = $('<img src="../img/dnipro.gif"/>').appendTo(this.container);
    img.on('click', function () {
        alert('Dnipro Logo !');
    });
}

function FcDynamoWidget() {
    FcWidget.apply(this, arguments);
    this.container.append('<h1>FC Dynamo Kyiv<h1>');
    var img = $('<img src="../img/fc_dynamo.gif"/>').appendTo(this.container);
    img.on('click', function () {
        alert('Dynamo Logo !');
    });
}

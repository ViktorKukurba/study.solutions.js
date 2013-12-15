var hashRouter = $.sammy(function () {

    this.element_selector = '#tab-container';

    this.get('#:id/karpaty', function (context) {
        karpaty = karpaty || new FcKarpatyWidget($('<div/>', { id: 'karpaty-contant'}).addClass('tab-content').appendTo($(sammy.element_selector)));
        if (dnipro) dnipro.hide();
        if (dynamo) dynamo.hide();
        karpaty.show();
    });
    this.get('#:id/dnipro', function (context) {
        dnipro = dnipro || new FcDniproWidget($('<div/>', { id: 'dnipro-contant' }).addClass('tab-content').appendTo($(sammy.element_selector)));
        if (karpaty) karpaty.hide();
        if (dynamo) dynamo.hide();
        dnipro.show();
    });

    this.get('#:id/dynamo', function (context) {
        dynamo = dynamo || new FcDynamoWidget($('<div/>', { id: 'dynamo-contant' }).addClass('tab-content').appendTo($(sammy.element_selector)));
        if (karpaty) karpaty.hide();
        if (dnipro) dnipro.hide();
        dynamo.show();
    });

    var sammy = this;
});
window.onload = function () {
    new TabContainer([{ name: 'dynamo', title: 'Dynamo' }, { name: 'dnipro', title: 'Dnipro' }, { name: 'karpaty', title: 'Karpaty'}]);
    hashRouter.run();
};

var karpaty, dnipro, dynamo;

function TabContainer(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        var li = $('<li class="active"><a href="../sammyjs/index.htm#1/' + tabs[i]['name'] + '">' + tabs[i]['title'] + '</a></li>').appendTo($('ul.tab-menu'));
        li.on('click', function() {
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
};

function FcKarpatyWidget() {
    FcWidget.apply(this, arguments);
    this.container.append('<h1>FC Karpaty Lviv<h1>');
    this.container.append('<img src="../img/fc_karpaty.gif"/>');
}

function FcDniproWidget() {
    FcWidget.apply(this, arguments);
    this.container.append('<h1>FC Dnipro Dnipropetrovsk<h1>');
    this.container.append('<img src="../img/dnipro.gif"/>');
}

function FcDynamoWidget() {
    FcWidget.apply(this, arguments);
    this.container.append('<h1>FC Dynamo Kyiv<h1>');
    var img = $('<img src="../img/fc_dynamo.gif"/>').appendTo(this.container);
    img.on('click', function () {
        var event = document.createEvent("ImgEvent");
        event.initImgEvent("click", true, true, window, 0,
                                                event.screenX, event.screenY, event.clientX, event.clientY,
                                                event.ctrlKey, event.altKey, event.shiftKey, event.metaKey,
                                                0, null);
        this.container[0].dispatchEvent(event);
    });
    console.log(img);
    this.container[0].addEventListener('ImgEvent', function () {
        alert('Dynamo');
    });
}

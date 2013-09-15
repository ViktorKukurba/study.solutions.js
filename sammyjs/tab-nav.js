var hashRouter = $.sammy(function () {

    this.element_selector = '#tab-container';

    this.get('#:id/tab', function (context) {
        karpaty = karpaty || new FcKarpatyWidget($('<div><div/>', { id: 'karpaty-contant' }).appendTo($(sammy.element_selector)));
        if (dnipro) dnipro.hide();
        if (dynamo) dynamo.hide();
        karpaty.show();
        //$('#tab-content').html('<h1>Tab-' + context['params']['id'] + '</h1>');

    });
    this.get('#:id/tab2', function (context) {
        dnipro = dnipro || new FcDniproWidget($('<div><div/>', { id: 'dnipro-contant' }).appendTo($(sammy.element_selector)));
        if (karpaty) karpaty.hide();
        if (dynamo) dynamo.hide();
        dnipro.show();
        //$('#tab-content').html('<h1>Tab2-' + context['params']['id'] + '</h1>');
    });

    this.get('#:id/tab3', function (context) {
        dynamo = dynamo || new FcDniproWidget($('<div><div/>', { id: 'dynamo-contant' }).appendTo($(sammy.element_selector)));
        if (karpaty) karpaty.hide();
        if (dnipro) dnipro.hide();
        dynamo.show();
        //$('#tab-content').html('<h1>Tab3-' + context['params']['id'] + '</h1>');
    });

    var sammy = this;
});
window.onload = function () {
    $('#tab-container li').on('click', function () {
        $('#tab-container li').removeClass('active');
        $(this).addClass('active');
    });
    hashRouter.run();
};

var karpaty, dnipro, dynamo;

function FcWidget($container) {
    var container = $container;
    this.show = function() {
        container.show();
    };

    this.hide = function () {
        container.show();
    };
};

function FcKarpatyWidget($container) {
    FcWidget.apply(this, arguments);
    $container.append('<h1>FC Karpaty Lviv<h1>');
    $container.append('<img src="../img/fc_karpaty.gif"/>');
}

function FcDniproWidget($container) {
    FcWidget.apply(this, arguments);
    $container.append('<h1>FC Dnipro Dnipropetrovsk<h1>');
    $container.append('<img src="../img/fc_karpaty.gif"/>');
}

function FcDynamoWidget($container) {
    FcWidget.apply(this, arguments);
    $container.append('<h1>FC Dynamo Kyiv<h1>');
    $container.append('<img src="../img/fc_karpaty.gif"/>');
}

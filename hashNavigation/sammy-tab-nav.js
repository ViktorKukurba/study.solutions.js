var hashRouter = $.sammy(function () {

    this.element_selector = '#tab-container';

    this.get('#:id/karpaty', function (context) {
        karpaty = karpaty || new FcKarpatyWidget($('<div/>', { id: 'karpaty-contant' }).addClass('tab-content').appendTo($(sammy.element_selector)));
        if (dnipro) dnipro.hide();
        if (dynamo) dynamo.hide();
        karpaty.show();
        console.log(context, context.app, hashRouter);
    });
    this.get('#:id/dnipro', function (context) {
        dnipro = dnipro || new FcDniproWidget($('<div/>', { id: 'dnipro-contant' }).addClass('tab-content').appendTo($(sammy.element_selector)));
        if (karpaty) karpaty.hide();
        if (dynamo) dynamo.hide();
        dnipro.show();
        console.log(context, context.app, hashRouter);
    });

    this.get('#:id/dynamo', function (context) {
        dynamo = dynamo || new FcDynamoWidget($('<div/>', { id: 'dynamo-contant' }).addClass('tab-content').appendTo($(sammy.element_selector)));
        if (karpaty) karpaty.hide();
        if (dnipro) dnipro.hide();
        dynamo.show();
        console.log(context, context.app, hashRouter);
    });

    var sammy = this;
});
window.onload = function () {
    new TabContainer([{ name: 'dynamo', title: 'Dynamo' }, { name: 'dnipro', title: 'Dnipro' }, { name: 'karpaty', title: 'Karpaty'}]);
    hashRouter.run();
};

var karpaty, dnipro, dynamo;

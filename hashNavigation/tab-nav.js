;
var hashRouter = (function () {
    /**
     * @private
     * @type {Array}
     */
    var routes = [];

    /**
     * @param {string} route
     * @return {Object} Route object.
     */
    var parseRoute = function (route) {
        /**@type{Object}*/
        var properties = { route: [], params: {} };
        /**@type{Array.<string>}*/
        var routeParams = route['route'].split('/');
        /**@type{Array.<string>}*/
        var hashParams = location.hash.replace('#', '').split('/');
        if (routeParams.length !== hashParams.length) return null;
        for (/**@type{number} */ var i = 0; i < routeParams.length; i++) {
            if (routeParams[i].indexOf(':') !== -1) {
                properties['params'][routeParams[i].replace(':', '')] = hashParams[i];
            } else if (routeParams[i] === hashParams[i]) {
                properties['route'].push(hashParams[i]);
            } else {
                return null;
            }
        }
        return properties;
    };

    /**
     * Handle hash change
     */
    var handleHashChange = function () {
        for (/**@type{number} */ var i = 0; i < routes.length; i++) {
            var properties = parseRoute(routes[i]);
            if (!properties) continue;
            routes[i].callback(properties);
            return;
        }
    };
    return {
        run: function () {
            window.removeEventListener('hashchange', handleHashChange, false);
            window.addEventListener('hashchange', handleHashChange, false);
            handleHashChange();
        },
        addHashRoute: function (route, callback) {
            if (typeof route !== 'string' || typeof callback !== 'function') {
                return;
            }
            routes.push({ route: route, callback: callback });
        }
    };
})();


window.onload = function () {
    new TabContainer([
        { name: 'dynamo', title: 'Dynamo' },
        { name: 'dnipro', title: 'Dnipro' },
        { name: 'karpaty', title: 'Karpaty' }
    ]);
    hashRouter.addHashRoute(':id/karpaty', function (context) {
        karpaty = karpaty || new FcKarpatyWidget($('<div/>', { id: 'karpaty-contant' }).addClass('tab-content').appendTo($('#tab-container')));
        if (dnipro) dnipro.hide();
        if (dynamo) dynamo.hide();
        karpaty.show();
    });

    hashRouter.addHashRoute(':id/dnipro', function (context) {
        dnipro = dnipro || new FcDniproWidget($('<div/>', { id: 'dnipro-contant' }).addClass('tab-content').appendTo($('#tab-container')));
        if (karpaty) karpaty.hide();
        if (dynamo) dynamo.hide();
        dnipro.show();
    });

    hashRouter.addHashRoute(':id/dynamo', function (context) {
        dynamo = dynamo || new FcDynamoWidget($('<div/>', { id: 'dynamo-contant' }).addClass('tab-content').appendTo($('#tab-container')));
        if (karpaty) karpaty.hide();
        if (dnipro) dnipro.hide();
        dynamo.show();
    });

    hashRouter.run();
};

var karpaty, dnipro, dynamo;

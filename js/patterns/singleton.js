/**
 * Singleton simple implementation
 */
var singleton = function() {
    /** @type {string} */var title = 'Test random number ';
    /** @type {number} */var value = Math.random();
    return {
        getValue: function() {
            return title + value;
        }
    };
}();

/**
 * Singteton for Namespaces
 */
var singletonNS = function(name) {
    /** @type{number} */var random = Math.random();
    return {
        greetMethod: function() {
            return "Hi " + name;
        },

        giveNumber: function() {
            return 'Your number is ' + random.toString()[2];
        }
    };
}("Viktor");

/**
 * Singleton simple implementation with lazy initialization
 */
var singletonLI = (function() {
    var instance;

    /**
     * return {Object} instance obj
     */
    function init() {
        /** @type {string} */var title = 'Test random number ';
        /** @type {number} */ var value = Math.random();
        return {
            getValue: function() {
                return title + value;
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };

}());

window.onload = function () {
    assert(true, 'simple singleton');
    for (var j = 0; j < 5; j++) {
        var s1 = singleton;
        var s2 = singleton;
        assert(s1 === s2, 'singleton works: ' + s1.getValue() + '=' + s2.getValue());
    }

    assert(true, 'singleton namespace');
    assert(true, singletonNS.greetMethod());
    assert(true, singletonNS.giveNumber());


    assert(true, 'singleton with lazy initialization');
    for (var i = 0; i < 5; i++) {
        var sLI1 = singletonLI.getInstance();
        var sLI2 = singletonLI.getInstance();
        assert(sLI1 === sLI2, 'singleton works: ' + sLI1.getValue() + '=' + sLI2.getValue());
    }

}
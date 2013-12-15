/**
 * @interface
 */
function BaseFactory(factorytype) {

    /**
     * @return {string} Type of factory.
     * @this {BaseFactory}
     */
    this.getType = function() {
        return type;
    };
    /** @type {string} */
    var type = factorytype;

    /**
     * Creates product
     * @this {BaseFactory}
     */
    this.createProduct = function() {
    };

    /**
     * Returns count of factory employees
     * @return {number}
     * @this {BaseFactory}
     */
    this.getEmployeesCount = function() {
        return employeesCount;
    };

    /**
     * Sets count of factory employees
     * @param {number} employees
     * @this {BaseFactory}
     */
    this.setEmployeesCount = function(employees) {
        if (typeof employees === 'number' && employees > 0) {
            employeesCount = employees;
        }
    };

    /** @type {number}*/
    var employeesCount = 0;

    /**
     * Returns count of factory products
     * @return {number}
     * @this {BaseFactory}
     */
    this.getProducts = function() {
        return products;
    };

    /**
     * Sells products and adds money to funds
     * @this {BaseFactory}
     */
    this.sellProducts = function() {
        while (products.length) {
            var product = products.shift();
            funds += product.getPrice();
        }
    };

    /**
     * Adds product to factory
     * @param {Object} product
     * @this {BaseFactory}
     */
    this.addProduct = function(product) {
        if (product) {
            products.push(product);
        }
    };

    /** @type {number}*/
    var funds = 0;

    /**
     * @return {number}
     */
    this.getFunds = function() {
        return funds;
    };

    /**@type {Array.<Object>}*/
    var products = [];

}

/**
 * @constructor
 * @extends {BaseFactory}
 */
function ChocolateFactory() {
    //BaseFactory.apply(this, arguments);
    this.createProduct = function(type) {
        var product;
        if (this.getEmployeesCount() > 0) {
            switch (type) {
                case 'chocolate-milk':
                    product = new ChocolateProduct({ name: 'chocolate-milk', price: 10, weight: 100, taste: 'milk' });
                    break;
                case 'chocolate-nut':
                    product = new ChocolateProduct({ name: 'chocolate-nut', price: 10, weight: 100, taste: 'nut' });
                    break;
                case 'candies':
                    product = new ChocolateProduct({ name: 'candies', price: 78, weight: 1000, taste: 'nut' });
                    break;
                default:
                case 'chocolate':
                    product = new ChocolateProduct({ name: 'chocolate', price: 10, weight: 100 });
                    break;
            }
            self_.addProduct(product);
            return product;
        }
    };
    var self_ = this;
}

ChocolateFactory.prototype = new BaseFactory('chocolate');

/**
 * @constructor
 */
function FactoryProduct(parameters) {
    var price = parameters['price'];
    this.getPrice = function () {
        return price || 0;
    };

    var name = parameters['name'];
    this.getName = function () {
        return name;
    };
}

function ChocolateProduct(parameters) {
    FactoryProduct.apply(this, arguments);

    var weight = parameters['weight'];
    this.getWeigth = function () {
        return weight;
    };

    var taste = parameters['taste'];
    this.getTaste = function () {
        return taste;
    };
};

function GuitarProduct(parameters) {
    FactoryProduct.apply(this, arguments);
    var strings = parseInt(parameters["strings"]);
    if (strings) {
        strings = strings > 7 ? 7 : strings < 4 ? 4 : strings;
    } else {
        strings = 6;
    }
    this.getStringsCount = function () {
        return strings;
    };
};

function ViolinProduct(parameters) {
    FactoryProduct.apply(this, arguments);
    var strings = parseInt(parameters["strings"]);
    if (strings) {
        strings = strings > 10 ? 10 : strings < 4 ? 4 : strings;
    } else {
        strings = 4;
    }

    this.getStringsCount = function () {
        return strings;
    };

    var bow = parameters['bow'];
    this.getBow = function () {
        return bow;
    };
};


/**
 * @constructor
 * @extends {BaseFactory}
 */
function MusicInstrumentsFactory() {
    //BaseFactory.apply(this, arguments);
    this.createProduct = function (type, strings) {
        if (this.getEmployeesCount() > 0) {
            var product;
            switch (type) {
                case 'guitar':
                    product = new GuitarProduct({ name: 'guitar', strings: strings, price: 200 });
                    break;
                case 'violin':
                    product = new ViolinProduct({ name: 'violin', strings: strings, price: 800 });
                    break;
                default:
                    product = new FactoryProduct({ name: 'drum', price: 1200 });
            }
            ;
            self_.addProduct(product);
            return product;
        }
    };
    var self_ = this;
}
MusicInstrumentsFactory.prototype = new BaseFactory('music');

function Factory() {
    /**
     * creates Factory
     * @param{string} type. Type of factory
     * @return{IFactory}
     */
    this.createFactory = function (type) {
        var factory;
        switch (type) {
            case 'chocolate':
                factory = new ChocolateFactory(type);
                factories.push(factory);
                return factory;
            case 'music':
                factory = new MusicInstrumentsFactory(type);
                factories.push(factory);
                return factory;
            default:
                factory = new BaseFactory(type);
                factories.push(factory);
                return factory;
        }
    };

    /** @type {Array.<BaseFactory>}*/
    var factories = [];

    this.getFactories = function () {
        return factories;
    };
}

window.onload = function () {
    var factory = new Factory();
    var chocolateFactory = factory.createFactory('chocolate');
    assert(true, "CHOCOLATE FACTORY");
    assert(chocolateFactory.getType() === 'chocolate', 'chocolateFactory has type "chocolate"');
    assert(typeof chocolateFactory === BaseFactory, 'chocolateFactory typeof BaseFactory');
    assert(typeof chocolateFactory === ChocolateFactory, 'chocolateFactory typeof ChocolateFactory');
    assert(chocolateFactory instanceof ChocolateFactory, 'chocolateFactory instanceof ChocolateFactory');
    assert(chocolateFactory instanceof ChocolateFactory, 'chocolateFactory instanceof BaseFactory');
    assert(chocolateFactory.getEmployeesCount() === 0, 'No employees');
    assert(chocolateFactory.createProduct('chocolate-milk'), 'created a product chocolate-milk');
    chocolateFactory.setEmployeesCount(5);
    assert(chocolateFactory.getEmployeesCount() === 5, '5 employees');
    assert(chocolateFactory.createProduct('candies'), 'created a product');
    chocolateFactory.createProduct();
    assert(chocolateFactory.getProducts().length === 2, '2 products created');
    assert(chocolateFactory.getFunds() === 0, 'No money');
    chocolateFactory.sellProducts();
    assert(chocolateFactory.getFunds() > 0, 'Money: ' + chocolateFactory.getFunds());
    assert(chocolateFactory.getProducts().length === 0, 'No products left');

    assert(true, "MUSICINSTRUMENTS FACTORY");
    var musicFactory = factory.createFactory('music');
    assert(musicFactory.getType() === 'music', 'musicFactory has type "music"');
    assert(musicFactory instanceof ChocolateFactory, 'musicFactory instanceof ChocolateFactory');
    assert(musicFactory instanceof MusicInstrumentsFactory, 'musicFactory instanceof MusicInstrumentsFactory');
    musicFactory.setEmployeesCount(2);
    assert(musicFactory.getEmployeesCount() === 2, '2 employees');
    assert(musicFactory.createProduct('guitar'), 'created a product');
    musicFactory.createProduct('violin');
    musicFactory.createProduct('drum');
    assert(musicFactory.getProducts().length === 3, '2 products created');
    musicFactory.sellProducts();
    assert(musicFactory.getFunds() > 0, 'Money: ' + musicFactory.getFunds());
    assert(musicFactory.getProducts().length === 0, 'No products left');
}
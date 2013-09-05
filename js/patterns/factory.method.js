/**
* @interface
*/
function BaseFactory(factorytype) {
    
    /**
    * @return {string} Type of factory
    * @this {BaseFactory}
    */
    this.getType = function() {
        return type;
    };
    /** @type {string} */
    var type = factorytype;

    /**
    * @Creates product
    * @this {BaseFactory}
    */
    this.createProduct = function() {
    };

    /**
    * Returns count of factory employees
    * @return {number} 
    * @this {BaseFactory}
    */
    this.getEmployeesCount = function () {
        return employeesCount;
    };

    /**
    * Sets count of factory employees
    * @param {number} 
    * @this {BaseFactory}
    */
    this.setEmployeesCount = function (employees) {
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
    this.getProducts = function () {
        return products;
    };

    /**
    * Sells products and adds money to funds
    * @this {BaseFactory}
    */
    this.sellProducts = function () {
        while (products.length) {
            var product = products.shift();
            funds += product.price;
        }
    };

    /**
    * Adds product to factory
    * @param {Object}
    * @this {BaseFactory}
    */
    this.addProduct = function (product) {
        if (product) {
            products.push(product);
        }
    };

    /** @type {number}*/
    var funds = 0;

    /**
    * @return {number}
    */
    this.getFunds = function () {
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
    //this.prototype = new BaseFactory();
    //BaseFactory.apply(this, arguments);
    this.createProduct = function () {
        if (this.getEmployeesCount() > 0) {
            var product = {
                name: 'chocolate',
                weigth: '100g',
                price: 10
            };
            self_.addProduct(product);
        }
        return product;
    };
    var self_ = this;
}

ChocolateFactory.prototype = new BaseFactory('chocolate');


/**
* @constructor
* @extends {BaseFactory}
*/
function MusicInstrumentsFactory() {
    //BaseFactory.apply(this, arguments);
    this.createProduct = function (strings) {
        if (this.getEmployeesCount() > 0) {
            strings = parseInt(strings);
            if (strings) {
                strings = strings > 7 ? 7 : strings < 4 ? 4 : strings;
            } else {
                strings = 6;
            }
            var product = {
                name: 'guitar',
                strings: strings,
                price: 200
            };
            self_.addProduct(product);
        }
        return product;
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
    this.createFactory = function(type) {
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

    this.getFactories = function() {
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
    assert(chocolateFactory.createProduct(), 'created a product');
    chocolateFactory.setEmployeesCount(5);
    assert(chocolateFactory.getEmployeesCount() === 5, '5 employees');
    assert(chocolateFactory.createProduct(), 'created a product');
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
    assert(musicFactory.createProduct(), 'created a product');
    musicFactory.createProduct();
    musicFactory.createProduct();
    assert(musicFactory.getProducts().length === 3, '2 products created');
    musicFactory.sellProducts();
    assert(musicFactory.getFunds() > 0, 'Money: ' + chocolateFactory.getFunds());
    assert(musicFactory.getProducts().length === 0, 'No products left');
}
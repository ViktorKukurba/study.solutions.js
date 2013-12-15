/**
 * Created by viktor on 12/9/13.
 */

/**
 * @constructor
 * @param {string} type Type of Vehicle.
 * */
function Vehicle(type) {
    /**@type{string}*/
    var type_ = type;
    /**@type{number}*/
    var id_ = Math.random();

    this.getPrice = function() {
        return 10 + Object.keys(self_).length;
    };
    /**
     * @return {string} Type of Vehicle.
     * */
    this.getType = function() {
        return type_;
    };
    this.model = 'A';
    /**
     * @return {string} Information about vehicle.
     **/
    this.vehicleInfo = function() {
        /**@type{string}*/
        var info = 'Info :';
        for (var prop in self_) {
            if (prop && typeof self_[prop] !== 'function')
                info += prop + '-' + self_[prop] + '; ';
        }
        info += 'Price: ' + self_.getPrice();
        return info;
    };
    var self_ = this;
}

var car = new Vehicle('car');
console.log(car.vehicleInfo());

var truck = new Vehicle('truck');
/**
 * @param {string} color
 * @this {Vehicle}
 **/
truck.setColor = function(color) {
    this.color = color;
};

truck.setColor('red');

console.log(truck.vehicleInfo());

/**
 * @param {Vehicle} vehicle
 * */
function modernDesign(vehicle) {
    var price = vehicle.getPrice();
    vehicle.getPrice = function() {
        return price + 4;
    };
}

/**
 * @param {Vehicle} vehicle
 * */
function improvedSystem(vehicle) {
    var price = vehicle.getPrice();
    vehicle.getPrice = function() {
        return price + 6;
    };
}

modernDesign(car);
improvedSystem(car);
console.log(car.vehicleInfo());


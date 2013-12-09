/** Prototype chain */

function Animal() {
    Object.defineProperty(this, "populationArea", { enumerable: true, value: "Earth", writable: false });

    this.multiply = function () {
        console.log('Animal mutiply');
        return 'Animal mutiply';
    };
}

var animal = new Animal();
Object.defineProperty(Animal, "population", { enumerable: true, writable: true, value: 50 });
animal.population = 100;
Animal.prototype.food = "grass";

function Mammal() {
    this.moveSomeWhere = function () {
        console.log('Mammal go somewhere by legs');
        return 'Mammal go somewhere by legs';
    };
}

function Human(parameters) {
    this.work = function () {
        console.log('Human doing something');
        return 'Human doing something';
    };
    this.moveSomeWhere = function () {
        console.log('Human go somewhere by legs, car, train, plain');
        return 'Human go somewhere by legs, car, train, plain';
    };
}


Mammal.prototype = new Animal();
Human.prototype = new Mammal();

var mammal = new Mammal();
var human = new Human();

console.log(animal, human, mammal, mammal.multiply());


/** Extending existing functionality */

var arr1 = new Array(1, 2, 3, '4');
var arr2 = Array(1, 2, '3', 4, '5', 8);
Array.prototype.maxNumber = function () {
    var max;
    for (var i = 0; i < this.length; i++) {

        if (typeof this[i] === 'number' && (max === undefined || max < this[i])) {
            max = this[i];
        }
    }
    return max;
};

console.log(arr1, arr2, arr1.maxNumber());

var animal2 = new Animal(); //equel to var animal2 = new animal.constructor();
window.onload = function () {
    assert(animal.food === 'grass', "object has all properties of constructor, even created after object instanciation");
    assert(animal.constructor === Animal, "animal.constructor === Animal");
    assert(animal2.constructor === Animal, "animal2.constructor === Animal");
    assert(animal2.prototype === undefined, "animal2.prototype === undefined");
    assert(animal2.__proto__ !== undefined, "animal2.__proto__ !== undefined");
    assert(Animal.prototype !== undefined, "Animal.prototype !== undefined");
    assert(Animal.__proto__ === undefined, "Animal.__proto__ === undefined");
    assert(Animal.constructor === Function, "Animal.constructor === Function");
    assert(Animal["population"] === 50, "Animal.population===50");
    assert(animal2["population"] === 50, "animal2.population===50");
    assert(animal["population"] === 100, "animal.population===100");
    assert(human.multiply() == 'Animal mutiply', "human['populationArea']==='Earth'");
    assert(mammal instanceof Animal, "mammal instanceof Animal");
    assert(human instanceof Mammal, "human instanceof Mammal");
    assert(human instanceof Animal, "human instanceof Animal");
    assert(arr1.maxNumber() === 3, "arr1.maxNumber() === 3");
    assert(arr2.maxNumber() === 8, "arr2.maxNumber() === 8");
    var scriptDiv = document.getElementById('results').appendChild(document.createElement('div'));
    scriptDiv.innerText = '';
}
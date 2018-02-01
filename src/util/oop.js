// Во избежание оговорок о глобальных переменных и функциях, 
// удобно полагать, что программа на языке JavaScript представляет 
// собой тело неявной функции [[main]]().

// ООП в «функциональном» стиле.
// класс User написан в «функциональном» стиле.
function User(name) {

  this.sayHi = function() {
    alert( "Привет, я " + name );
  };

}

var vasya = new User("Вася"); // создали пользователя
vasya.sayHi(); // пользователь умеет говорить "Привет"

// --------------------------------------------------------
// Наследование в функиональном стиле
function Machine() {
  var enabled = false;

  this.enable = function() {
    enabled = true;
  };

  this.disable = function() {
    enabled = false;
  };
}

function CoffeeMachine(power) {
  Machine.call(this); // отнаследовать

  var waterAmount = 0;

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };

}

var coffeeMachine = new CoffeeMachine(10000);

coffeeMachine.enable();
coffeeMachine.setWaterAmount(100);
coffeeMachine.disable()

// -------------------------------------------------
// -------------------------------------------------

// ООП в прототипном стиле
var animal = {
  eats: true
};
var rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;

// в rabbit можно найти оба свойства
alert( rabbit.jumps ); // true
alert( rabbit.eats ); // true

// Object.getPrototypeOf(obj) === obj.__proto__

var animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
  this.__proto__ = animal;
}

var rabbit = new Rabbit("Кроль");

alert( rabbit.eats ); // true, из прототипа

// ----------------------------
function Rabbit() {}

Rabbit.prototype = {
  constructor: Rabbit
};

function Rabbit() {}

// в Rabbit.prototype есть одно свойство: constructor
alert( Object.getOwnPropertyNames(Rabbit.prototype) ); // constructor

// оно равно Rabbit
alert( Rabbit.prototype.constructor == Rabbit ); // true

function Rabbit(name) {
  this.name = name;
  alert( name );
}

var rabbit = new Rabbit("Кроль");

var rabbit2 = new rabbit.constructor("Крольчиха");

// Полный код наследования
// 1. Конструктор Animal
function Animal(name) {
  this.name = name;
  this.speed = 0;
}

// 1.1. Методы -- в прототип

Animal.prototype.stop = function() {
  this.speed = 0;
  alert( this.name + ' стоит' );
}

Animal.prototype.run = function(speed) {
  this.speed += speed;
  alert( this.name + ' бежит, скорость ' + this.speed );
};

// 2. Конструктор Rabbit
function Rabbit(name) {
  this.name = name;
  this.speed = 0;
}

// 2.1. Наследование
Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;

// 2.2. Методы Rabbit
Rabbit.prototype.jump = function() {
  this.speed++;
  alert( this.name + ' прыгает, скорость ' + this.speed );
}

// При создании объекта через new, в его прототип __proto__ записывается ссылка 
// из prototype функции-конструктора.
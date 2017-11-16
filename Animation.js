var Animation = function () {
  var type,speed;
  var speed = this.speed;
  var type = this.type;
  if (this.constructor === Animation) {
    throw new Error('Cannot instanciate abstract class');
  }
};

// this is our abstract method
Animation.prototype.someMethod = function () {
  throw new Error('Cannot call abstract method')
  
};
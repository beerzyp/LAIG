var LinearAnimation = function (speed,controlPoints) {
  this.speed=speed;
  this.controlPoints=controlPoints;
  this.type='linear';
  var arguments = [];
  arguments.push(this.speed);
  arguments.push(this.controlPoints);
  arguments.push(this.type);
  Animation.apply(this, arguments);
};

// let's inherit from abstract class
LinearAnimation.prototype = Object.create(Animation.prototype, {
  'constructor': LinearAnimation
});



// let's define our concrete method
LinearAnimation.prototype.someMethod = function () {
  console.log('Concrete Method');
};
var BezierAnimation = function (speed,controlPoints) {
  this.speed=speed;
  this.controlPoints=controlPoints;
  var arguments = [];
  arguments.push(this.speed);
  arguments.push(this.controlPoints);
   this.type='bezier';
  arguments.push(this.type);
  Animation.apply(this, arguments);
};

// let's inherit from abstract class
BezierAnimation.prototype = Object.create(Animation.prototype, {
  'constructor': BezierAnimation
});



// let's define our concrete method
BezierAnimation.prototype.someMethod = function () {
  console.log('Concrete Method');
};
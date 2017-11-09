var CircularAnimation = function (speed,centerx,centery,centerz,radius,startang,rotang) {
  var arguments = [];
  this.speed=speed;
  arguments.push(this.speed);
  this.centerx=centerx;
  arguments.push(this.centerx);
  this.centery=centery;
  arguments.push(this.centery);
  this.centerz=centerz;
  arguments.push(this.centerz);
  this.radius=radius;
  arguments.push(this.radius);
  this.startang=startang;
  arguments.push(this.startang);
  this.rotang=rotang;
  arguments.push(this.rotang);
  this.type='circular';
  arguments.push(this.type);
  Animation.apply(this, arguments);
};

// let's inherit from abstract class
CircularAnimation.prototype = Object.create(Animation.prototype, {
  'constructor': CircularAnimation
});



// let's define our concrete method
CircularAnimation.prototype.someMethod = function () {
  console.log('Concrete Method');
};
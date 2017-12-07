
class CircularAnimation extends Animation{
  constructor(scene, id, animationVelocity, center, radius, startAng, rotAng){
    super(scene, id, animationVelocity, new Array());

    this.radius = radius;
    this.startAng = startAng * Math.PI/180;
    this.rotAng = rotAng * Math.PI/180;
    this.center = center;
    this.angVelocity = this.animationVelocity/this.radius;

    this.transformMatrix = mat4.create();
    this.totalTime = this.rotAng / this.angVelocity;
    this.secTimes.push(this.totalTime);
}

   getTransformMatrix(node, time, section) {
    if(time * this.angVelocity >=  this.rotAng)
       this.animationEnd = true;
    else {
      mat4.identity(this.transformMatrix);
      let dAlfa = this.startAng + this.angVelocity* time;
      mat4.translate(this.transformMatrix, this.transformMatrix, [this.center[0], this.center[1], this.center[2] ]);
      mat4.rotate(this.transformMatrix, this.transformMatrix, dAlfa, [0, 1, 0]);
      mat4.translate(this.transformMatrix, this.transformMatrix, [this.radius, 0, 0]);
      mat4.rotate(this.transformMatrix, this.transformMatrix, Math.PI/2, [0, 1, 0]);
    }
    return this.transformMatrix;
  }
}

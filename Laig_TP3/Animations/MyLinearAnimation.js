
class LinearAnimation extends Animation{
  constructor(scene, id, animationVelocity, controlPoints){
    super(scene, id, animationVelocity, controlPoints);

    this.initValues = new Array();
    this.totalDistance = 0;
    for (let i = 0; i < controlPoints.length-1; i++){
      let values = new Array();
      let dist = Math.sqrt(
        (controlPoints[i+1][0] - controlPoints[i][0])*(controlPoints[i+1][0] - controlPoints[i][0]) +
        (controlPoints[i+1][1] - controlPoints[i][1])*(controlPoints[i+1][1] - controlPoints[i][1]) +
        (controlPoints[i+1][2] - controlPoints[i][2])*(controlPoints[i+1][2] - controlPoints[i][2]));

      this.totalDistance += dist;
      let cosAlfa = (controlPoints[i+1][0] - controlPoints[i][0])/dist;
      let senAlfa = (controlPoints[i+1][2] - controlPoints[i][2])/dist;
      let dy = controlPoints[i+1][1] - controlPoints[i][1];
      if(dy !== 0){
        dy /= Math.abs(controlPoints[i+1][1] - controlPoints[i][1]);
      }

      let alfa = Math.acos(cosAlfa);

      let vx = animationVelocity * cosAlfa;
      let vz = animationVelocity * senAlfa;
      let vy = Math.sqrt(Math.round((this.animationVelocity * this.animationVelocity - vx*vx - vz*vz)*1000)/1000)*dy;
      this.secTimes.push(dist/this.animationVelocity);
      values.push(vx, vy, vz, alfa);
      this.initValues.push(values);
    }
    this.totalTime = this.totalDistance / animationVelocity;
    this.transformMatrix = mat4.create();

  }

   getTransformMatrix(node, time, section) {
    let secTime = time;
    for(let i = 0; i < section; i++)
      secTime -= this.secTimes[i];


    if(section < this.controlPoints.length - 1){
      mat4.identity(this.transformMatrix);
      let dx = secTime * this.initValues[section][0];
      let dy = secTime * this.initValues[section][1];
      let dz = secTime * this.initValues[section][2];

      mat4.translate(this.transformMatrix, this.transformMatrix, [dx, dy, dz]);
      mat4.translate(this.transformMatrix, this.transformMatrix,
         [this.controlPoints[section][0],
         this.controlPoints[section][1],
         this.controlPoints[section][2]]);

      mat4.rotate(this.transformMatrix, this.transformMatrix, this.initValues[section][3], [0, 1, 0]);
    }
    else
      this.animationEnd = true;

    return this.transformMatrix;
  }

}

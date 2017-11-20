class LinearAnimation extends Animation {
  constructor(scene,id,speed,controlPoints){
    super(scene,id);
    this.speed=speed;
    this.controlPoints=controlPoints;
    var distance=0;
   // var angle=calcAngle(this.controlPoints[0][0])
   this.calcTotalDist();
   var time=this.distance/this.speed;
   this.currentPos=0;
   this.objectPos=vec3.create();
   this.applyAnimation();
  }

calcTotalDist(){
  this.distance=0;
  for(var i=0;i<this.controlPoints.length-1;i++){
    var startingPoint=this.controlPoints[i];
    var origin=vec3.fromValues(startingPoint[0],startingPoint[1],startingPoint[2]);
    var next=vec3.fromValues(this.controlPoints[i+1][0],this.controlPoints[i+1][1],this.controlPoints[i+1][2]);
    this.distance+=vec3.distance(next,origin);
  }
}

applyAnimation(){
  while(this.currentPos!=this.controlPoints.length){
    this.objectPos=this.controlPoints[this.currentPos];
    
    this.currentPos++;
  }
  this.currentPos=0;

}




};
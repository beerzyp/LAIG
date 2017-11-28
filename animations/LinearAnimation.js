class LinearAnimation extends Animation {
  constructor(scene,id,speed,controlPoints){
    super(scene,id);
    this.speed=speed;
    this.controlPoints=controlPoints;
    this.finalPoints=[];
    var distance=0;
   // var angle=calcAngle(this.controlPoints[0][0])
   this.calcTotalDist();
   this.time=this.distance/this.speed;
   this.currentPos=0;
   this.objectPos=vec3.create();
   this.currentDistance=0;
   this.vec=this.controlPoints.reverse();
   this.newVec=[];
    this.dec=-1;
    this.inc=1;
    this.var=this.inc;
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

update(deltaTime){
   if(this.currentPos==this.controlPoints.length-1){
        this.var=this.dec;
   }
   else if(this.currentPos==0)
    this.var=this.inc;
  }

display(){
  this.scene.translate(this.controlPoints[this.currentPos+this.var][0]-this.controlPoints[this.currentPos][0],this.controlPoints[this.currentPos][1],this.controlPoints[this.currentPos][2]);
   this.currentPos+=this.var;
}

getTotalTime(){
  return this.time;
}


};
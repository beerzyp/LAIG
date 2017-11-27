class BezierAnimation extends Animation {
  constructor(scene,id,speed,controlPoints){
    super(scene,id,speed);
    this.speed=speed;
    this.controlPoints=controlPoints;
    
    this.bezierPoints = [];
    this.points = [];
    

    this.totalDistance = 0;
    for(var i = 0; i < 4; i++)
      this.bezierPoints.push(vec3.fromValues(controlPoints[i][0], controlPoints[i][1], controlPoints[i][2]));


    this.totalDistance = this.casteljau();
    this.dec=-1;
    this.inc=1;
    this.var=this.inc;
    this.currentPos=0;
    this.totalTime = this.totalDistance / this.speed;
    this.time = 0;
    this.accuracy = 0.01 // 100 segments
    this.calcPointsForBezier();
  }

casteljau(){

    let p12 = vec3.create();
    vec3.sub(p12, this.bezierPoints[1],this.bezierPoints[0]);
    vec3.scale(p12, p12, 0.5);

    let p23 = vec3.create();
    vec3.sub(p23, this.bezierPoints[2],this.bezierPoints[1]);
    vec3.scale(p23, p23, 0.5);

    let p34 = vec3.create();
    vec3.sub(p34, this.bezierPoints[3],this.bezierPoints[2]);
    vec3.scale(p34, p34, 0.5);

    let p123 = vec3.create();
    vec3.sub(p123, p23, p12);
    vec3.scale(p123, p123, 0.5);

    let p234 = vec3.create();
    vec3.sub(p234, p34, p23);
    vec3.scale(p234, p123, 0.5);

    let pM = vec3.create();
    vec3.sub(p123, p234, p123);
    vec3.scale(pM, pM, 0.5);

    return vec3.distance(p12, this.bezierPoints[0]) +
           vec3.distance(p12, p123) +
           vec3.distance(p123, p234) +
           vec3.distance(p234, p34) +
           vec3.distance(p34, this.bezierPoints[3]);

  }


  calcPointsForBezier(){
      for(let i=0;i<1;i+=this.accuracy){
        var point = this.bezier(i,this.controlPoints[0],this.controlPoints[1], this.controlPoints[2], this.controlPoints[3]);
        this.points.push(point);
      }

  }

  bezier(t, p0, p1, p2, p3){
    var cX = 3 * (p1[0] - p0[0]),
        bX = 3 * (p2[0] - p1[0]) - cX,
        aX = p3[0] - p0[0] - cX - bX;

    var cY = 3 * (p1[1] - p0[1]),
        bY = 3 * (p2[1] - p1[1]) - cY,
        aY = p3[1] - p0[1] - cY - bY;

    var cZ = 3 * (p1[2]- p0[2]),
        bZ = 3 * (p2[2] - p1[2]) - cZ,
        aZ = p3[2] - p0[2] - cZ - bZ;

    var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0[0];
    var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0[1];
    var z = (aZ * Math.pow(t, 3)) + (bZ * Math.pow(t, 2)) + (cZ * t) + p0[2];


    return {x: x, y: y,z:z};
  }
  update(){
   if(this.currentPos==this.points.length-2){
        this.var=this.dec;
   }
   else if(this.currentPos==0)
    this.var=this.inc;

  }
  display(){
    this.scene.translate(this.points[this.currentPos+this.var].x-this.points[this.currentPos].x,this.points[this.currentPos+this.var].y-this.points[this.currentPos].y,this.points[this.currentPos+this.var].z-this.points[this.currentPos].z);
   this.currentPos+=this.var;
  }

  getTotalTime(){
    return this.totalTime;
  }

}
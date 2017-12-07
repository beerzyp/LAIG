
class Animation{
  constructor(scene, id, animationVelocity, controlPoints){
      this.scene = scene;
      this.id = id;
      this.animationVelocity = animationVelocity;
      this.controlPoints = controlPoints;
      this.animationEnd = false;
      this.totalTime = 0;
      this.secTimes = new Array();
  }


 // update(dt) {}

 getTotalTime(){
   return this.totalTime;
 }

 hasEnded(){
      return this.animationEnd;
 }
}

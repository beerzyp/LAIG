
class ComboAnimation{
  constructor(scene, id, animationRefs){
    this.scene = scene;
    this.id = id;
    this.animationRefs = animationRefs;
    this.animationMatrix = mat4.create();
    mat4.identity(this.animationMatrix);
    //this.currentSection = 0;//Used in Linear and Combo Animations
    this.secTimes = new Array();
    this.totalTime = 0;
    let time = 0;

    for(let i = 0; i <this.animationRefs.length; i++){
      time = this.scene.animations[this.animationRefs[i]].getTotalTime();
      this.totalTime += time;
      this.secTimes.push(time);
    }

  }
  getTotalTime(){
    return this.totalTime;
  }

  getTransformMatrix(node, time, section) {
    // if(this.animationRefs[node.combIte] == 'gentlemanClaptrap1')
    //   console.log(" ");
    let combSecTime = time;

    for(let i = 0; i < node.currentSection; i++)
      combSecTime -= this.secTimes[i];

    if (node.combIte < this.animationRefs.length){
      mat4.identity(this.animationMatrix);
      this.animationMatrix =  this.scene.animations[this.animationRefs[node.combIte]].getTransformMatrix(node, time, node.currentSection);
      if(combSecTime >= this.scene.animations[this.animationRefs[node.combIte]].getTotalTime()){
          node.currentSection = 0;
          node.combIte++;
      }
       else if (combSecTime >= this.scene.animations[this.animationRefs[node.combIte]].secTimes[node.currentSection])
           node.currentSection++;
   }
    return this.animationMatrix;
  }

}

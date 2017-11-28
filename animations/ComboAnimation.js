class ComboAnimation extends Animation {
  constructor(scene, id, animationRefs){
    super(scene,id,animationRefs);
    this.scene = scene;
    this.id = id;
    this.animationRefs = animationRefs;
    //this.currentSection = 0;//Used in Linear and Combo Animations
    this.totalTime = 0;
    let time = 0;
    this.dec=-1;
    this.inc=1;
    this.var=this.inc;

   for(let i = 0; i <this.animationRefs.length; i++){
      time = this.scene.graph.animationsArray[i].getTotalTime();
      this.totalTime += time;
    }
    this.currAnimation=0;
  }
  getTotalTime(){
    return this.totalTime;
  }

  update(deltaTime){
   if(this.currAnimation==this.animationRefs.length-1){
        this.var=this.dec;
   }
   else if(this.currAnimation==0)
    this.var=this.inc;

  }
  display(){
    this.scene.graph.animationsArray[this.currAnimation].display();
  }

}

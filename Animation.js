
class Animation {

  constructor(scene,id){
    this.scene=scene;
    this.id=id;
    this.createAnimationsVec();
    this.pushAnimation(id);
  }
  
createAnimationsVec(){
  this.animations = [];
}

pushAnimation(iD){
  this.animations.push(iD);
  }

};





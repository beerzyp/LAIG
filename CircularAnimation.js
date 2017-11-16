/**
d="cirularAn" speed="5" type="circular"
	centerx="2" centery="1" centerz="0"
	radius="1" startang="30" rotang="15"
	CircularAnimation(this.scene,AnimationID,speed,centerx,centery,centerz,radius,startang,rotang);
*/

class CircularAnimation extends Animation{
  constructor(scene,id,speed,circular,centerx,centery,centerz,radius,startang,rotang){
    super(scene,id);
    this.speed=speed;
    this.circular=circular;
    this.centerx=centerx;
    this.centery=centery;
    this.centerz=centerz;
    this.radius=radius;
    this.startang=startang;
    this.rotang=rotang;
  
  }
};
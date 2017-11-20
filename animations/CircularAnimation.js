/**
d="cirularAn" speed="5" type="circular"
	centerx="2" centery="1" centerz="0"
	radius="1" startang="30" rotang="15"
	CircularAnimation(this.scene,AnimationID,speed,centerx,centery,centerz,radius,startang,rotang);
*/

class CircularAnimation extends Animation{
  constructor(scene,id,speed,circular,centerx,centery,centerz,radius,startang,rotang){
    super(scene,id,speed);
    this.speed=speed;
    this.circular=circular;
    this.centerx=centerx;
    this.centery=centery;
    this.centerz=centerz;
    this.radius=radius;
    this.startang=startang;
    this.rotang=rotang;
    var animationTime = (2*Math.PI*this.radius)/this.speed;
  	this.dist = this.rotAng * this.radius;
	this.atualdist = 0;
	this.atualAngle = 0;
	
	this.over = false;

    }

    display() {
        this.scene.translate(this.centerx, this.centery, this.centerz);
        this.scene.translate(this.radius * Math.cos(this.startang + this.atualAngle), 0, -this.radius * Math.sin(this.startang + this.atualAngle));
        this.scene.rotate(Math.PI + this.startAng + this.atualAngle, 0, 1, 0);
    }

    update(deltaTime) {
        if (this.atualAngle < this.rotang) {
            this.atualdist += ((deltaTime / 1000) * this.dist) / (this.animationTime / 1000);
            this.atualAngle = this.atualdist / this.radius;
        } else {
            this.over = true;
            this.atualAngle = 0;
            this.atualdist = 0;
        }
    }

    clone() {
        //var copy = new CircularAnimation(this.scene, this.id, this.animationTime, this.center, this.radius, this.startAng, this.rotAng);
        //return copy;
    }

}
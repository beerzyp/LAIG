/**
d="cirularAn" speed="5" type="circular"
	centerx="2" centery="1" centerz="0"
	radius="1" startang="30" rotang="15"
	CircularAnimation(this.scene,AnimationID,speed,centerx,centery,centerz,radius,startang,rotang);
*/

class CircularAnimation extends Animation{
  constructor(scene,id,speed,centerx,centery,centerz,radius,startang,rotang){
    super(scene,id,speed);
    this.speed=speed;
    this.centerx=centerx;
    this.centery=centery;
    this.centerz=centerz;
    this.radius=radius;
    this.startang=startang;
    this.rotang=rotang;
	this.animationTime = (2*Math.PI*this.radius)/this.speed;
  	this.dist = this.rotang * this.radius;
	this.atualdist = 0;
	this.atualAngle = 0;
	this.meu = 0;
	

	this.over = false;

    }

    display() {
		//console.log(this.rotang);
        //this.scene.translate(this.centerx, this.centery, this.centerz);
        //this.scene.translate(this.radius * Math.cos(this.startang + this.atualAngle), 0, -this.radius * Math.sin(this.startang + this.atualAngle));
		console.log(this.scene.period);
		this.scene.period++;
		if(this.scene.period == 6)
		{
			this.meu = this.meu + Math.PI/20;
			this.scene.period = 0;
		}
		
		
        this.scene.rotate(Math.cos(this.meu), 0, 0, 1);
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
		var copy = new CircularAnimation(this.scene, this.id, this.animationTime, this.center, this.radius, this.startang, this.rotang);
        return copy;
    }

}
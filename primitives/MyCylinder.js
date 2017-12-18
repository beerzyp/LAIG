/**
 * MyCylinder
 * @constructor
 * @args height, bottom radius, top radius, sections along height(stacks) and parts per section(slices), botFlag and topFlag
 */
function MyCylinder(scene, args) {
    CGFobject.call(this, scene);

    this.height = args[0];
    this.botRad = args[1];
    this.topRad = args[2];
    this.stacks = args[3];
    this.slices = args[4];
    this.topFlag = args[5];
    this.botFlag = args[6];

    //Testing
    this.topFlag = 1;
   this.botFlag = 1;

    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

    var stepAng = 2 * Math.PI / this.slices;
    var currRadius = this.botRad;
    var radiusInc = (this.topRad - this.botRad)/this.stacks;

    this.vertices = new Array();
    this.indices = new Array();1
    this.normals = new Array();
    this.texCoords = new Array();

    var deltaS = 1/this.slices;
    var deltaT = 1/this.stacks;

	var depth = this.height/this.stacks;

 	for (let i = 0; i <=this.stacks; i++){
		for (let j = 0; j <= this.slices; j++){
			this.vertices.push(currRadius * Math.cos(j*stepAng), currRadius * Math.sin(j*stepAng), i*depth);
			this.normals.push(currRadius * Math.cos(j*stepAng), currRadius * Math.sin(j*stepAng), 0);
			this.texCoords.push(j*deltaS, i*deltaT);

			if (i < this.stacks) {
				this.indices.push((i*this.slices)+j+i, (i*this.slices)+this.slices+j+1+i, i*(this.slices)+this.slices+j+i);
				this.indices.push((i*this.slices)+j+i, (i*this.slices)+j+1+i, i*(this.slices)+this.slices+j+1+i);
			}
		}
        currRadius += radiusInc;
 	}

  //------------------LIDS-----------------------------------------------------
  this.topFlag = 1;
  this.botFlag = 1;


    if(this.topFlag){ //Z++
  		this.vertices.push(0, 0, this.height);
  		this.normals.push(0, 0, 1);
  		this.texCoords.push(0.5, 0.5);

  		let centerVertIdx = this.vertices.length/3-1;


      for (let i = 0; i < this.slices; i++){
    		this.vertices.push(this.topRad*Math.cos(i*stepAng), this.topRad*Math.sin(i*stepAng), this.height);
    		this.normals.push(0, 0, 1);
    		this.texCoords.push(Math.cos(i*stepAng)/2 + 0.5, 1- (Math.sin(i*stepAng)/2 + 0.5));

    		this.indices.push(centerVertIdx + 0,  centerVertIdx+ i+1, centerVertIdx + i+2);
	     }


		this.vertices.push(this.topRad*1, 0, this.height);
		this.normals.push(0, 0, 1);
		this.texCoords.push(1, 0.5);

  }

    if(this.botFlag){ //Z--
  		this.vertices.push(0, 0, 0);
  		this.normals.push(0, 0, -1);
  		this.texCoords.push(0.5, 0.5);

  		let centerVertIdx = this.vertices.length/3 - 1;


      for (let i = 0; i < this.slices; i++){
      		this.vertices.push(this.botRad * Math.cos(i*stepAng), this.botRad * Math.sin(i*stepAng), 0);
      		this.normals.push(0, 0, -1);
      		this.texCoords.push(Math.cos(i*stepAng)/2 + 0.5, 1 - (Math.sin(i*stepAng)/2 + 0.5));

          this.indices.push(centerVertIdx + 0,  centerVertIdx + i + 2, centerVertIdx + i + 1);
      }

  		this.vertices.push(this.botRad*1, 0, 0);
  		this.normals.push(0, 0, -1);
  		this.texCoords.push(1, 0.5);

    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyCylinder.prototype.updateTexCoords = function (sFactor, tFactor) {};

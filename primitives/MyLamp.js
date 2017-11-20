/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a lamp with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a lamp with varying number of slices and stacks?
 	*/

 	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];

	var ang_z = Math.PI/2/this.stacks;
	var ang_xy = 2*Math.PI / this.slices;
	
	for(var j = 0; j < this.stacks+1; j++){
		
		var z = j/this.stacks;

		for(var i = 0; i < this.slices; i++)
		{
			this.vertices.push(Math.cos(i * ang_xy)*Math.cos(j *ang_z),Math.sin(i * ang_xy)*Math.cos(j * ang_z), Math.sin(j*ang_z));
			this.normals.push(Math.cos(i * ang_xy)*Math.cos(j *ang_z),Math.sin(i * ang_xy)*Math.cos(j * ang_z), 0);
			this.texCoords.push(i/this.slices,j/this.stacks);
		}

	}


	for(var j = 0; j < this.stacks; j++){
		for(var i = 0; i < this.slices; i++)
		{
			this.indices.push(this.slices*j+i,this.slices*j+i+1,this.slices*(j+1)+i);
			if (i != (this.slices - 1)) {
				this.indices.push(this.slices*(j+1)+i+1,this.slices*(j+1)+i,this.slices*j+i+1);
			}
			else {
				this.indices.push(this.slices*j,this.slices*j+i+1,this.slices*j+i);
			}
			
		}

	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };


 MyLamp.prototype.scaleTexCoords = function(ampS, ampT) {
}
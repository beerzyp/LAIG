/**
 * MyRectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 * @ param args coordinates for left-top and right-bottom vertices.
 */


function MyRectangle(scene, args) {
	CGFobject.call(this,scene);

	this.args = args;
	this.texCoords = new Array();


	this.minS = 0;
	this.minT = 0;
	this.maxS = this.args[2] - this.args[0]; //deltaS rectangle width
	this.maxT = this.args[1] - this.args[3]; //Rectangle height

	this.initBuffers();
};

MyRectangle.prototype = Object.create(CGFobject.prototype);
MyRectangle.prototype.constructor=MyRectangle;

MyRectangle.prototype.initBuffers = function () {

	this.vertices = [
            this.args[0], this.args[1], 0,
            this.args[0], this.args[3] ,0,
            this.args[2], this.args[1], 0,
            this.args[2], this.args[3], 0,
		];

	this.indices = [
           0,1,2,
           1,3,2,
        ];

    this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
    ]

    this.baseTexCoords = [
		this.minS, this.minT,
		this.minS, this.maxT,
		this.maxS, this.minT,
		this.maxS, this.maxT,
	];
	this.texCoords = new Array(this.baseTexCoords.length);


	this.updateTexCoords(1,1);

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};


MyRectangle.prototype.updateTexCoords = function (sFactor, tFactor) {

	for(let i = 0; i < this.baseTexCoords.length; i++){
		if(i%2 == 0)
			this.texCoords[i] = this.baseTexCoords[i]/sFactor;
		else
			this.texCoords[i] = this.baseTexCoords[i]/tFactor;
	}
	this.updateTexCoordsGLBuffers();

};

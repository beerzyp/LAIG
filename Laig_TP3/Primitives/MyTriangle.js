
/**
 * MyTriangle
 * @constructor
 * @args coordinates of each vertex(x,y,z)
 */
 function MyTriangle(scene, args) {
 	CGFobject.call(this,scene);

  	this.args = args;
  this.initBuffers(args);
 };

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

 MyTriangle.prototype.initBuffers = function(args) {

    this.vertices = new Array();
    this.indices = new Array();
    this.normals = new Array();
    this.baseTexCoords = new Array();



    this.vertices.push(this.args[0], this.args[1], this.args[2]); //P0
    this.vertices.push(this.args[3], this.args[4], this.args[5]); //P1
    this.vertices.push(this.args[6], this.args[7], this.args[8]); //P2


    //CROSS PRODUCT AxB = -BxA
    var A = [this.args[0], this.args[1], this.args[2]];
    var B = [this.args[3], this.args[4], this.args[5]];
    var C = [this.args[6], this.args[7], this.args[8]];

    var vecAC = [C[0] - A[0], C[1] - A[1], C[2] - A[2]];
    var vecAB = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];

    // //Neg AB
    // var vecAB = [-B[0] + A[0], -B[1] + A[1], -B[3] + A[2]];

    //x = 0, y = 1, z= 2
    var normalVec = [
      vecAB[1]*vecAC[2]-vecAC[1]*vecAB[2],
      -1*(vecAB[0]*vecAC[2]-vecAC[0]*vecAB[2]),
      vecAB[0]*vecAC[1]-vecAC[0]*vecAB[1],
    ];

    for(let i = 0; i < 3; i++)
      this.normals.push(normalVec[0], normalVec[1], normalVec[2]);
    // this.normals.push(0, 1, 0);
    // this.normals.push(0, 1, 0);
    // this.normals.push(0, 1, 0);


    //a -> dist(P0, P2)
    var a = Math.sqrt( (this.args[0]-this.args[6]) * (this.args[0]-this.args[6]) +
                       (this.args[1]-this.args[7]) * (this.args[1]-this.args[7]) +
                       (this.args[2]-this.args[8]) * (this.args[2]-this.args[8]));


    //b -> dist(P0, P1)
    var b = Math.sqrt((this.args[3]-this.args[0]) * (this.args[3]-this.args[0]) +
                      (this.args[4]-this.args[1]) * (this.args[4]-this.args[1]) +
                      (this.args[5]-this.args[2]) * (this.args[5]-this.args[2]));

    //c -> dist(P1, P2)
    var c = Math.sqrt((this.args[6]-this.args[3]) * (this.args[6]-this.args[3]) +
                      (this.args[7]-this.args[4]) * (this.args[7]-this.args[4]) +
                      (this.args[8]-this.args[5]) * (this.args[8]-this.args[5]));



    var cosBeta = (a*a - b*b + c*c)/(2*a*c);

    var beta = Math.acos(cosBeta);

    var a_sinBeta = a*Math.sin(beta);

    var a_cosBeta = a*cosBeta;

    this.baseTexCoords.push(c - a * cosBeta, a_sinBeta); //for P0

    this.baseTexCoords.push(0, 0); //for P1

    this.baseTexCoords.push(c, 0); //for P2


    this.texCoords = new Array(this.baseTexCoords.length);


    this.updateTexCoords(1,1);


    this.indices.push(0, 1, 2);

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyTriangle.prototype.updateTexCoords = function (sFactor, tFactor) {
    for(let i = 0; i < this.baseTexCoords.length; i++){
        if(i%2 == 0)
            this.texCoords[i] = this.baseTexCoords[i]/sFactor;
        else
            this.texCoords[i] = (tFactor - this.baseTexCoords[i])/tFactor;
    }
    this.updateTexCoordsGLBuffers();
};

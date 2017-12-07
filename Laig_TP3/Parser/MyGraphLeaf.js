/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, leafID, type, args) {

	this.graph = graph;
	this.id = leafID;
	this.type = type;
	this.args = args;

	this.obj = null;

	switch(this.type) {
            case 'rectangle':
             this.obj =  new MyRectangle(this.graph.scene, this.args);
            break;

            case 'sphere':
            this.obj = new MySphere(this.graph.scene, this.args);
            break;

            case 'cylinder':
             this.obj = new MyCylinder(this.graph.scene, this.args);
            break;

            case 'triangle':
             this.obj = new MyTriangle(this.graph.scene, this.args);
            break;

            case 'patch':
             this.obj = new MyPatch(this.graph.scene, this.args);
            break;
        }
};

MyGraphLeaf.prototype.display = function() {
	this.obj.display();
};

MyGraphLeaf.prototype.updateTexCoords = function(sFactor, tFactor) {
    this.obj.updateTexCoords(sFactor, tFactor);
};

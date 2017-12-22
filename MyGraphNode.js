/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;
    
    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;
    this.flag=true;
    this.animations=[];
	this.delta=0;
    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
   
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

MyGraphNode.prototype.pushAnimation = function(animation) {
    this.animations.push(animation);
}
MyGraphNode.prototype.getAnimation = function(){
    return this.animations;
}


/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

MyGraphNode.prototype.updateAnimation = function (){
	var inc=0;
    if(this.animations.length!=0){
		inc++;
		if(inc < 5){
		this.animations[0].update();
		this.animations[0].display();

		}
    }
}

MyGraphNode.prototype.counter= function(delta){
	this.delta=delta;
}


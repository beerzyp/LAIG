/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/
/**
 scene , descendants[i];   getAttribute() descendants[j].getAttributeNode("type").value = type
Square(scene, minX, minY, maxX, maxY)
function MySphere(scene, radius, slices, stacks) function 
 function Cylinder(scene, height, bottomRadius, topRadius, stacks, slices,  texture)
 Square(scene, minX, minY, maxX, maxY)
function MyTriangle(scene, x1,y1,z1,x2,y2,z2,x3,y3,z3)
descendants[j].getAttributeNode("args").value[ ] 0 2 4 6

**/
function MyGraphLeaf(graph, xmlelem) {

    this.graph=graph;
    this.xmlelem=xmlelem;
    var type = xmlelem.getAttributeNode("type").value
     this.args=this.xmlelem.getAttributeNode("args").value.split(" ");
     //this.obj=this.obj.split(" ");
    switch(type){
        case 'rectangle':
        this.obj = new Square(this.graph.scene,parseFloat(this.args[0]),parseFloat(this.args[1]),parseFloat(this.args[2]),parseFloat(this.args[3]));
       // MyQuad(this.graph);
        break;
        case 'sphere':
        this.obj = new MySphere(this.graph.scene,parseFloat(this.args[0]),parseFloat(this.args[1]),parseFloat(this.args[2]));
        break;
        case 'cylinder':
        this.obj = new Cylinder(this.graph.scene,parseFloat(this.args[0]),parseFloat(this.args[1]),parseFloat(this.args[2]),parseFloat(this.args[3]),parseFloat(this.args[4]));
        break;
        case 'triangle':
        this.obj = new MyTriangle(this.graph.scene,parseFloat(this.args[0]),parseFloat(this.args[1]),parseFloat(this.args[2]),parseFloat(this.args[3]),parseFloat(this.args[4]),parseFloat(this.args[5]),parseFloat(this.args[6]),parseFloat(this.args[7]),parseFloat(this.args[8]));
        break;
        case 'patch':
        //this.obj= new Patch(this.graph.scene,)
        break;
    }


}

MyGraphLeaf.prototype.display = function() {
   if(this.obj != null)
   {
	   this.obj.display();
   }		
}






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
    if(type=='patch'){
       var tamanho=this.xmlelem.children.length;
       var controlPoints = new Array();
       var vdivs=0;
       
       for(var i=0;i<tamanho;i++){
           bigArray = new Array();
           var size=xmlelem.children[i].children.length;
           vdivs=0;
           for(var k=0;k<size;k++){
           vdivs++;
           pointArray = new Array();
           var x0=parseFloat(xmlelem.children[i].children[k].getAttributeNode("xx").value);
           var y0=parseFloat(xmlelem.children[i].children[k].getAttributeNode("yy").value);
           var z0=parseFloat(xmlelem.children[i].children[k].getAttributeNode("zz").value);
           var w0=parseFloat(xmlelem.children[i].children[k].getAttributeNode("ww").value); //weight
           pointArray.push(x0,y0,z0,w0);
           bigArray.push(pointArray);
           }
           controlPoints.push(bigArray);
         
       }
       this.divs=this.xmlelem.getAttributeNode("args").value.split(" ");
       this.divs[0]=parseFloat(this.divs[0]);
       this.divs[1]=parseFloat(this.divs[1]);
       this.divs.push(parseFloat(tamanho-1));
       this.divs.push(parseFloat(vdivs-1));
       this.divs.push(controlPoints);


    } 
    else{               
    this.args=this.xmlelem.getAttributeNode("args").value.split(" ");}
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
        this.obj= new MyPatch(this.graph.scene,this.divs);
        break;
    }


}

MyGraphLeaf.prototype.display = function() {
   if(this.obj != null)
   {
	   this.obj.display();
   }		
}






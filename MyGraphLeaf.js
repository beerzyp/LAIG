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
       
       for(var i=0;i<tamanho;i++){
//            var Point1= new Array();
//            var Point2= new Array();
           //console.log(xmlelem.children[i].children[0]);
           pointArray = new Array();
           pointArray2 = new Array();
         
           var x0=xmlelem.children[i].children[0].getAttributeNode("xx").value;
           var y0=xmlelem.children[i].children[0].getAttributeNode("yy").value;
           var z0=xmlelem.children[i].children[0].getAttributeNode("zz").value;
           var w0=xmlelem.children[i].children[0].getAttributeNode("ww").value; //weight
           pointArray.push(x0,y0,z0,w0);
           controlPoints.push(pointArray);
//            Point1.push(x0);
//            Point1.push(y0);
//            Point1.push(z0);
//            Point1.push(w0);
//            Linha.push(Point1);
           var x1=xmlelem.children[i].children[1].getAttributeNode("xx").value;
           var y1=xmlelem.children[i].children[1].getAttributeNode("yy").value;
           var z1=xmlelem.children[i].children[1].getAttributeNode("zz").value;
           var w1=xmlelem.children[i].children[1].getAttributeNode("ww").value;
            pointArray2.push(x1,y1,z1,w1);
            controlPoints.push()
//            Point1.push(x0);
//            Point2.push(y0);
//            Point2.push(z0);
//            Point2.push(w0);
           controlPoints.push(pointArray2);
          /* console.log(y1);
           console.log(z1);
           console.log(w1);
            console.log("\n");*/
       }
       this.divs=this.xmlelem.getAttributeNode("args").value.split(" ");
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






function MyPatch(scene, nurbs) {

	this.scene = scene;

	var uDivs = nurbs[0];
 	var vDivs = nurbs[1];
 	this.controlPoints = nurbs[4];
 	var uDegree=nurbs[2];
 	var vDegree=nurbs[3];
	var knots1 = this.getKnotsVector(uDegree);
	var knots2 = this.getKnotsVector(vDegree);
	
	var nurbsSurface = new CGFnurbsSurface(uDegree, vDegree, knots1, knots2, this.controlPoints);

   getSurfacePoint = function(u, v) {
	  return nurbsSurface.getPoint(u, v);
	};

  this.nurbsObject = new CGFnurbsObject(this.scene, getSurfacePoint, uDivs, vDivs);

};

MyPatch.prototype = Object.create(MyGraphLeaf.prototype);
MyPatch.prototype.constructor = MyPatch;


MyPatch.prototype.display = function(){
	this.nurbsObject.display();
}

MyPatch.prototype.getKnotsVector = function(degree) { 
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
};

MyPatch.prototype.scaleTexCoords = function(scaleS, scaleT) {
};


/*
function MyNurb(graph, divU, divV, controlvertexes) {
  MyGraphLeaf.call(this, graph)

  // this.divU = divU;
  // this.divV = divV;

  var degreeU = controlvertexes.length - 1;
  var degreeV = controlvertexes[0].length - 1;
  var knots1 = this.getKnotsVector(degreeU);
  var knots2 = this.getKnotsVector(degreeV);

  var nurbsSurface = new CGFnurbsSurface(degreeU, degreeV, knots1, knots2, controlvertexes);

  getSurfacePoint = function(u, v) {
  return nurbsSurface.getPoint(u, v);
};

  this.nurbsObject = new CGFnurbsObject(graph.scene, getSurfacePoint, divU, divV);

};

MyNurb.prototype = Object.create(MyGraphLeaf.prototype);
MyNurb.prototype.constructor = MyNurb;

MyNurb.prototype.getKnotsVector = function(degree) {

  var knotsAux = [];
  for (var i=0; i<=degree; i++) {
    knotsAux.push(0);
  }
  for (var i=0; i<=degree; i++) {
    knotsAux.push(1);
  }

  return knotsAux;
};

MyNurb.prototype.display = function() {
  this.nurbsObject.display();
}
*/
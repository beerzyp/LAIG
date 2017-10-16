function MyPatch(scene, nurbs) {

	this.scene = scene;

	var uDivs = nurbs[0];
 	var vDivs = nurbs[1];
 	this.cPoints = nurbs[2];
 	var uDegree=7;
 	var vDegree=3;
	var knots1 = this.getKnotsVector(uDegree);
	var knots2 = this.getKnotsVector(vDegree);
	this.nurbsSurface = new CGFnurbsSurface(uDegree, vDegree, knots1, knots2, this.cPoints);
	
	CGFnurbsObject.call(this, this.scene, this.getSurfacePoint, nurbs.partsU, nurbs.partsV);
};

MyPatch.prototype = Object.create(CGFnurbsObject.prototype);
MyPatch.prototype.constructor=MyPatch;

MyPatch.prototype.getSurfacePoint = function(u, v) {
		return this.nurbsSurface.getPoint(u, v);
};

MyPatch.prototype.display = function(){
	CGFnurbsObject.prototype.display.call(this);
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
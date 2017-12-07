/**
 * MyPatch
 * @constructor
 */
 function MyPatch (scene, args) {
 	this.scene = scene;
 	var uDivs = args[0];
 	var vDivs = args[1];
 	var uDegree = args[2];
 	var vDegree = args[3];
 	var cPoints = args[4];

	var knots1 = this.getKnotsVector(uDegree);
	var knots2 = this.getKnotsVector(vDegree);

	console.log(cPoints);

 	this.nurbsSurface = new CGFnurbsSurface(uDegree, vDegree, knots1, knots2, cPoints);

	CGFnurbsObject.call(this, this.scene, this.getSurfacePoint, uDivs, vDivs);
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

MyPatch.prototype.updateTexCoords = function(scaleS, scaleT) {};

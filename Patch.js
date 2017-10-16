function Patch(scene, nurbs) {

	this.scene = scene;

	this.knotsV = this.knotsU = getKnots(nurbs.order);

	this.vertexes = getNurbVertexes(nurbs.order, nurbs.controlPoints);
		
	this.nurbsSurface = new CGFnurbsSurface(nurbs.order, nurbs.order, this.knotsU, this.knotsV, this.vertexes);

	CGFnurbsObject.call(this, this.scene, this.getSurfacePoint, nurbs.partsU, nurbs.partsV);
}


Patch.prototype = Object.create(CGFnurbsObject.prototype);
Patch.prototype.constructor=Patch;


Patch.prototype.getSurfacePoint = function (u, v) {
	return this.nurbsSurface.getPoint(u, v);
};

Patch.prototype.display = function() {
	this.scene.pushMatrix();
		CGFnurbsObject.prototype.display.call(this);
	this.scene.popMatrix();
}


getKnots = function(){
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}

getNurbVertexes = function(order,controlPoints){
    var vertex= new Array();
    var it=0;
    for(var i=0;i<=order;i++){
        var point = new Array();
        for(var j=0;j<=order;j++){
            point.push(controlPoints[it]);
            it++;
        }
        vertex.push(point);

    }
    return vertex;
    
}



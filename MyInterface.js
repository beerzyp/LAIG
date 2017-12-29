 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);

}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui
    
    this.gui = new dat.GUI();
	this.pecasBrancas="";
	this.gui.add(this.scene, 'TempoBrancas');
	this.gui.add(this.scene, 'TempoPretas');
	this.gui.add(this.scene,'EngineNextMoveTime');
	this.gui.add(this.scene, 'gameMode', {
			'3D': 0,
			'2D': 1, 			 
			
	}).name('Interface Type Game');
	


    // add a group of controls (and open/expand by defult)
	this.gui.add(this.scene, 'selectedExampleShader', {
			'Mix c/Amarelo': 0,
			'Flat Shading': 1, 			 
			'Passing a varying parameter from VS -> FS': 2, 
			'Simple texturing': 3, 
			'Multiple textures in the FS': 4, 
			'Multiple textures in VS and FS': 5,
			'Sepia': 6,
			'Convolution': 7
			
	}).name('Shader examples');
	obj = this;
	this.gui.add(this.scene, 'scaleFactor',-50,50).onChange(function(v)
	{
		obj.scene.updateScaleFactor(v);
	});
    
    return true;
};

MyInterface.prototype.addObjectGroup = function(objs)
{
	var group = this.gui.addFolder("CapturedWhitePieces");
    group.open();
	for(var key in objs)
	{
			group.add(objs, key);
		
		
	}
	
}


/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("CapturedBlackPieces");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
           // group.add(this.scene.lightValues, key);
        }
    }	
	
	this.gui.add(this.scene,'askForEngineTip');
	this.gui.add(this.scene,'UndoLastMove');
	this.gui.add(this.scene,'RestartGame');
	this.gui.add(this.scene,'setCameraView');
	this.gui.add(this.scene,'WhitePiecesTaken');
	this.gui.add(this.scene,'BlackPiecesTaken');
	

}


MyInterface.prototype.EngineNextMoveTime = function(time){
	this.gui.__controllers[2].setValue(time);
}
MyInterface.prototype.white = function(string){
	//this.pecasBrancas+=","+string;
	this.gui.__controllers[3].setValue(this.pecasBrancas);
}

MyInterface.prototype.black = function(string){
	//this.pecasPretas+=","+string;
	this.gui.__controllers[4].setValue(this.pecasPretas);
}
MyInterface.prototype.tempoBrancas = function(time){
	this.gui.__controllers[0].setValue(time);
}
MyInterface.prototype.tempoPretas = function(time){
	this.gui.__controllers[1].setValue(time);
	
}



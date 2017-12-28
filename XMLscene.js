var DEGREE_TO_RAD = Math.PI / 180;


/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */


function HumanOrBot(){
	var person = prompt("Select Game: Humans or Bot, Bots,aibot,aihuman");
	if (person =="Bot" || person == "bot") {
		return person;
	}
	else if(person == "Human" || person == "human" || person == "humans"){
		return person;
	}
	else if(person =="BotBot" || person == "botvsBot" || person =="Bots" || person == "bots"){
		return person;
	}
	
	else if(person =="intbot" || person == "aibot" || person =="Aibot" || person == "AIBOT")
	{
		return person;
	}
	else if(person == "intHuman" || person == "AIhuman"|| person=="aihuman")
	{
		return person;
	}
}

function ChosenDepth(){
	var person = prompt("Choose ai depth: 1-6");
	return parseInt(person);
}

function GameOverByTime(color) {
    window.confirm("Game Ended: Player " + color + " lost by time");
	this.chess.reset();
}

function askForGameTime(){
	var player = prompt("Select Game Time, in minutes");
	return parseInt(player);
}
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;
	this.count = 0;
	this.initTime=0;
    this.lightValues = {};
	this.objectValues = {};
	this.selectedExampleShader = 0;
	this.board = new BoardLogic();
	this.temp=[8][8];
	this.temp = this.board.getChessBoard();
	this.previousPicked = -1;
	//withNewLogic
	this.chess = new Chess();
	
	this.ai= new hintMove(this.chess);
	
	this.tabuleiro = this.chess.ascii();
	this.TempoBrancas="0";
	this.TempoPretas="0";
	this.EngineNextMoveTime="0";
	this.flagB = 1;
	this.flagP = 1;
	this.activeCamFlag=true;
	this.gameMode = 0;
	this.row = 0;
	this.collum = 0;
	this.humanGame=HumanOrBot();
	this.gameTime=askForGameTime();
	this.chosenDepth=ChosenDepth();
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    
    this.initCameras();

    this.enableTextures(true);
    
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    
    this.axis = new CGFaxis(this);
	this.count = 0;
	//shaders
	this.setUpdatePeriod(16);
	this.scaleFactor=50.0; //para modificar consoante o tempo
	this.factor = 0;
	this.count = 0;
	this.check=true;
	this.colorScale = 1;
	this.mover = 0;
	this.animations=[];
	this.pickedPiece = 0;
	this.pretasTime = 1;
	this.brancasTime = 1;
	this.segB = 0;
	this.minB = 0;
	this.segP = 0;
	this.minP = 0;
	//animations
	this.period = 0;
	let initDate= new Date();
	this.initialTime=initDate.getTime();

	this.testShaders=[
		new CGFshader(this.gl, "shaders/uScale.vert", "shaders/uScale.frag"),
		new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag"),
		
		new CGFshader(this.gl, "shaders/varying.vert", "shaders/varying.frag"),
		new CGFshader(this.gl, "shaders/texture1.vert", "shaders/texture1.frag"),
		new CGFshader(this.gl, "shaders/texture2.vert", "shaders/texture2.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/texture3.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/sepia.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/convolution.frag")
	];
	
	// texture will have to be bound to unit 1 later, when using the shader, with "this.texture2.bind(1);"
	this.testShaders[4].setUniformsValues({uSampler2: 1});
	this.testShaders[5].setUniformsValues({uSampler2: 1});
	this.setPickEnabled(true);
}

XMLscene.prototype.updateScaleFactor=function(v)
{

	this.testShaders[0].setUniformsValues({normScale: this.factor});
	this.testShaders[0].setUniformsValues({colorScale: this.colorScale});
	this.testShaders[2].setUniformsValues({normScale: this.factor});
	this.testShaders[5].setUniformsValues({normScale: this.factor});

}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.
    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];
            
            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);
            
            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();
            
            this.lights[i].update();
            
            i++;
        }
    }
    
}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
	this.camera.setPosition(vec3.fromValues(10,40,40));
	
}

/* Handler called when the graph is finally loaded. 
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function() 
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);
    
    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1], 
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);
    
    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);
    
    this.initLights();

    // Adds lights group.
	
	this.interface.addObjectGroup(this.graph.objects);
    this.interface.addLightsGroup(this.graph.lights);
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup
    this.logPicking();
	this.clearPickRegistration();
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
	
    this.pushMatrix();

	
    if (this.graph.loadedOk) 
    {        
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		this.axis.display();

        var i = 0;				
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }
		
        // Displays the scene.
		this.setActiveShader(this.defaultShader);
		this.updateScaleFactor(this.scaleFactor);
        this.graph.displayScene();
		this.setActiveShader(this.defaultShader);

    }
	else
	{
		// Draw axis
		this.axis.display();
	}
    

    this.popMatrix();
    if(this.chess.turn()=='b'){
		if(this.flagP == 1){
			this.pretasTime = this.initTime;
			this.flagP = 0;
			this.flagB = 1;
			this.aSegP = this.segP;
			this.aMinP = this.minP;
		}	
		this.segP = Math.floor((this.initTime - this.pretasTime) / (1000)) + this.aSegP;
		if(this.segP>60){
			this.segP = this.segP % 60;
		}
		this.minP = Math.floor((this.initTime - this.pretasTime) / (1000*60)) + this.aMinP;
		this.interface.tempoPretas(this.minP + ':' + this.segP);
		if(this.minP>=this.gameTime){
			
				GameOverByTime("black");
		}
	} else{	
		if(this.flagB == 1){
			this.brancasTime = this.initTime;
			this.flagB = 0;
			this.flagP = 1;
			this.aSegB = this.segB;
			this.aMinB = this.minB;
		}	
		this.segB = Math.floor((this.initTime - this.brancasTime) / (1000)) + this.aSegB;
		if(this.segB>60){
			this.segB = this.segB % 60;
		}
		this.minB = Math.floor((this.initTime - this.brancasTime) / (1000*60)) + this.aMinB;
		this.interface.tempoBrancas(this.minB + ':' + this.segB);
				if(this.minB>=this.gameTime){
				
				GameOverByTime("white");
		}
		
	}
    // ---- Efile:///C:/Users/R/Desktop/projeto/animations/LinearAnimation.jsND Background, camera and axis setup
    
}


XMLscene.prototype.update = function(currTime){
	for(var node in this.graph.nodes){
		if(this.graph.nodes[node].animations.length!=0)
			this.graph.nodes[node].counter(currTime-this.initTime);
	}
	this.initTime=currTime;
}

XMLscene.prototype.logPicking = function ()
{
	this.temp = this.board.getChessBoard();
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];
					if(this.pickedPiece == customId){
						this.pickedPiece = 0;
					}else{	
						this.pickedPiece = customId;
					}
					//logic Id
					var logicId = this.translateToLogic(customId);
					if(this.previousPicked != -1){
					
					// Game Logic for 2 Humans
						if(this.humanGame=="human" || this.humanGame=="humans" || this.humanGame=="Human"){
						var row = (logicId % 8);
						var newrow = this.translateToLetter(row);
						var collum = 8-(Math.floor((logicId )/ 8));
						
						var prow = (this.previousPicked % 8);
						var pnewrow = this.translateToLetter(prow);
						var pcollum = 8-(Math.floor((this.previousPicked)/ 8));
						var camAxisX=CGFcameraAxis.Z;
						//for animations
						this.row = row;
						this.collum = collum;
						this.rowp = prow;
						this.collump = pcollum;
						var move = pnewrow + pcollum + '-' + newrow + collum;
						this.chess.move(move, {sloppy: true});
						if(this.tabuleiro != this.chess.ascii()){
							this.mover = 1;
						} else{
							this.mover = 0;
						}
							if(this.chess.turn()=='b'){
								this.camera.setPosition(vec3.fromValues(0,0,0));
								this.camera.rotate(camAxisX,Math.PI);
								this.camera.setPosition(vec3.fromValues(-10,40,-40));	
								this.camera.zoom(10);					
							}
							else this.camera.setPosition(vec3.fromValues(10,40,40));
						if(this.chess.in_check()){	
										if(this.check==true && !this.chess.game_over()){
											if(window.confirm("check")==true){
												console.log("check");
												this.check=false;
										}} else if(this.chess.game_over()){
											console.log("checkMate");						
											window.confirm("CheckMate!")==true;
										}
										else this.check=true;							
							}

							this.tabuleiro = this.chess.ascii();
							console.log(move);
						}



						//game Logic for human/bot, bot as white
						else if(this.humanGame == "bot" || this.humanGame == "Bot"){
							if(this.chess.turn()=='b'){
								var row = (logicId % 8);
								var newrow = this.translateToLetter(row);
								var collum = 8-(Math.floor((logicId )/ 8));

								var prow = (this.previousPicked % 8);
								var pnewrow = this.translateToLetter(prow);
								var pcollum = 8-(Math.floor((this.previousPicked)/ 8));
								var camAxisX=CGFcameraAxis.Z;
								var move = pnewrow + pcollum + '-' + newrow + collum;
								this.camera.setPosition(vec3.fromValues(0,0,0));
								this.camera.rotate(camAxisX,Math.PI);
								this.camera.setPosition(vec3.fromValues(-10,40,-40));	
								this.camera.zoom(10);
								this.chess.move(move, {sloppy: true});					
							}
							else{
								  var moves = this.chess.moves();
								  var newMove = moves[Math.floor(Math.random() * moves.length)];
								  this.chess.move(newMove,{sloppy: true});
							}
							if(this.chess.in_check()){	
							if(this.check==true && !this.chess.game_over()){
								if(window.confirm("check")==true){
									console.log("check");
									this.check=false;
									}
								} 
								else if(this.chess.game_over()){
								console.log("checkMate");						
								window.confirm("CheckMate!")==true;
								}
								else this.check=true;							
							}

							this.tabuleiro = this.chess.ascii();
							console.log(move);

						}


						//game logic for bots
						else if(this.humanGame == "bots" || this.humanGame == "botvbot"|| this.humanGame=="Bots"){
							if(this.chess.turn()=='b'){
								  var moves = this.chess.moves();
								  var newMove = moves[Math.floor(Math.random() * moves.length)];
								  this.chess.move(newMove,{sloppy: true});
							}
							else {
								 var moves = this.chess.moves();
								 var newMove = moves[Math.floor(Math.random() * moves.length)];
								 this.chess.move(newMove,{sloppy: true});
							}


							if(this.chess.in_check()){	
								if(this.check==true && !this.chess.game_over()){
									if(window.confirm("check")==true){
										console.log("check");
										this.check=false;
									}
								} 
								else if(this.chess.game_over()){
									console.log("checkMate");						
									window.confirm("CheckMate!")==true;
								}
								else this.check=true;							
							}

							this.tabuleiro = this.chess.ascii();
							console.log(move);
						}
						
						else if(this.humanGame == "intBot" || this.humanGame == "AIbot"|| this.humanGame=="aibot"){
							if(this.chess.turn()=='b'){
								  var moves = this.chess.moves();
								  var newMove = moves[Math.floor(Math.random() * moves.length)];
								  this.chess.move(newMove,{sloppy: true});
							}
							else {
								 var d = new Date().getTime();
							     var bestMove = this.ai.minimaxRoot(this.chosenDepth,this.chess, true);
								 var d2 = new Date().getTime();
								 var moveTime = (d2 - d);
								 var positionsPerS = ( this.ai.positionCount * 1000 / moveTime);
								 this.chess.move(bestMove);
							}


							if(this.chess.in_check()){	
								if(this.check==true && !this.chess.game_over()){
									if(window.confirm("check")==true){
										console.log("check");
										this.check=false;
									}
								} 
								else if(this.chess.game_over()){
									console.log("checkMate");						
									window.confirm("CheckMate!")==true;
								}
								else this.check=true;							
							}

							this.tabuleiro = this.chess.ascii();
							console.log(move);
						}
						
						else if(this.humanGame == "intHuman" || this.humanGame == "AIhuman"|| this.humanGame=="aihuman"){
							if(this.chess.turn()=='b'){
								 var d = new Date().getTime();
							     var bestMove = this.ai.minimaxRoot(this.chosenDepth,this.chess, true);
								 var d2 = new Date().getTime();
								 var moveTime = (d2 - d);
								 var positionsPerS = ( this.ai.positionCount * 1000 / moveTime);
								 this.interface.EngineNextMoveTime(Math.round((moveTime/1000)+(moveTime/1000)*0.1));
								 this.chess.move(bestMove);
							}
							else {
								var row = (logicId % 8);
								var newrow = this.translateToLetter(row);
								var collum = 8-(Math.floor((logicId )/ 8));
								
								var prow = (this.previousPicked % 8);
								var pnewrow = this.translateToLetter(prow);
								var pcollum = 8-(Math.floor((this.previousPicked)/ 8));
								var camAxisX=CGFcameraAxis.Z;
								//for animations
								this.row = row;
								console.log(this.row);
								this.collum = collum;
								var move = pnewrow + pcollum + '-' + newrow + collum;
								this.chess.move(move, {sloppy: true});
							}


							if(this.chess.in_check()){	
								if(this.check==true && !this.chess.game_over()){
									if(window.confirm("check")==true){
										console.log("check");
										this.check=false;
									}
								} 
								else if(this.chess.game_over()){
									console.log("checkMate");						
									window.confirm("CheckMate!")==true;
								}
								else this.check=true;							
							}

							this.tabuleiro = this.chess.ascii();
							console.log(move);
						}


					

					}
					
					this.previousPicked = logicId;
										
					//obj:sym id:posicao
					//console.log("Picked object: " + obj + ", with pick id " + customId);
					
					//logic 
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}
XMLscene.prototype.translateToLogic = function (ID)
{
	//tabuleiro
	if(ID <=64){
		return ID -1;
	}
	//pecas
	if(ID <=128){
		return ID -65;
	}
}

XMLscene.prototype.translateToLetter = function (ID){
	if(ID==0){
		return "a";
	}
	if(ID==1){
		return "b";
	}
	if(ID==2){
		return "c";
	}
	if(ID==3){
		return "d";
	}
	if(ID==4){
		return "e";
	}
	if(ID==5){
		return "f";
	}
	if(ID==6){
		return "g";
	}
	if(ID==7){
		return "h";
	}					
}
XMLscene.prototype.UndoLastMove = function(){
	this.chess.undo();
	this.tabuleiro = this.chess.ascii();
	if(this.chess.turn()=='b'){
		this.camera.setPosition(vec3.fromValues(0,0,0));
		//this.camera.rotate(camAxisX,Math.PI);
		this.camera.setPosition(vec3.fromValues(-10,40,-40));						
	}
		else this.camera.setPosition(vec3.fromValues(10,40,40));
}



XMLscene.prototype.BotOrHuman=function(){

}
XMLscene.prototype.setCameraView=function(){
		if(this.activeCamFlag){
		this.interface.setActiveCamera(this.camera);
		this.activeCamFlag=!this.activeCamFlag;
		}
		else {
			this.interface.setActiveCamera(null);
			this.activeCamFlag=!this.activeCamFlag;
		}

}
XMLscene.prototype.RestartGame=function(){
		this.chess.reset();
		this.tabuleiro = this.chess.ascii();
		if(this.chess.turn()=='b'){
			this.camera.setPosition(vec3.fromValues(0,0,0));
			//this.camera.rotate(camAxisX,Math.PI);
			this.camera.setPosition(vec3.fromValues(-10,40,-40));						
		}
		else this.camera.setPosition(vec3.fromValues(10,40,40));
		this.aSegP = 0; 
		this.segP = 0;
		this.aMinP = 0;
		this.minP = 0;
		this.aSegB = 0; 
		this.segB = 0;
		this.aMinB = 0;
		this.minB = 0;
		this.interface.tempoBrancas(this.minB + ':' + this.segB);
		this.interface.tempoPretas(this.minB + ':' + this.segB);
}
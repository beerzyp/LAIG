class BoardLogic{
    constructor(board){
         //public variables
        this.kingNotSafe=false; 
        this.gameOver=false;
		this.chessBoard = BoardLogic.chessBoard;
        this.castleWhiteLong=true,this.castleWhiteShort=true,this.castleBlackLong=true,this.castleBlackShort=true;
        this.kingPositionC=this.kingPositionL=0;
        for(var i=0;i<BoardLogic.chessBoard.length;i++){
            for(var k=0;k<BoardLogic.chessBoard[i].length;k++){
                
                if(BoardLogic.chessBoard[i][k]=='A'){
                    break;
                }
                this.kingPositionC++;
            }
        }

         for(var i=0;i<BoardLogic.chessBoard.length;i++){
            for(var k=0;k<BoardLogic.chessBoard[i].length;k++){
               
                if(BoardLogic.chessBoard[i][k]=='a'){
                    break;
                }
                 this.kingPositionL++;
            }
        }
        //initializes arrays with the constructed pieces in play array<PieceType>
        this.kingPieces=[];
       this.queenPieces=[];
       this.bishopPieces=[];
       this.knightPieces=[];
       this.pawnPieces=[];
       this.rookPieces=[];
        
    }

    //getters,setters and adds

   getKingPieces() {
        return this.kingPieces;
    }

   getQueenPieces() {
        return this.queenPieces;
    }

    getRookPieces() {
        return this.rookPieces;
    }

    getPawnPieces() {
        return this.pawnPieces;
    }

    getBishopPieces() {
        return this.bishopPieces;
    }

    getKnightPieces() {
        return this.knightPieces;
    }

    addKingPieces(kingPiece) {
        this.kingPieces.push(kingPiece);
    }

   addQueenPieces(queenPiece) {
        this.queenPieces.push(queenPiece);
    }

   addRookPieces(rookPiece) {
        this.rookPieces.push(rookPiece);
    }

    addPawnPieces(pawnPiece) {
        this.pawnPieces.push(pawnPiece);
    }

    delPawn(pos){
        for(var i = 0; i < this.pawnPieces.length; i++){
            if(this.pawnPieces[i].getPosOnBoard() == pos)
                this.pawnPieces.splice(i,i);
        }
    }

    addBishopPieces(bishopPiece) {
        this.bishopPieces.push(bishopPiece);
    }

    addKnightPieces(knightPiece) {
        this.knightPieces.push(knightPiece);
    }
    
    getChessBoard(){
        return this.chessBoard;
    }

    calculatePos(x,y){
        temp[8][8];

        if(x == 7 && y == 7)
            temp[x][y] = 0;
        else
            temp[x][y] = 1;

        var pos=0;

        for(var i = 0; i < temp.length; i++){
            for(var j = 0; j < temp[i].length; j++) {
                pos++;
                if (temp[i][j] == 1) {
                    return pos-1;
                }
            }
        }

        return pos - 1;
    }


    getPossibleMoveIndexAtBoard(a1){
        var index=-1;
        if(a1!==undefined) {

            
            if(a1.length <= 6){
                    var x = parseInt(a1.substring(3, 4));
                    var y = parseInt(a1.substring(4, 5));
                    index = this.calculatePos(x, y);
            }
            else{ // promotion

                if(a1.charAt(5)=='C')
                {
                    var kingNew = parseInt(a1.substring(3, 4));
                    index = this.calculatePos(7, kingNew);

                }
                   else{
                        var y = parseInt(a1.substring(1, 2));
                        var x = 0;
                        index = this.calculatePos(x, y);
                   }
            }

    }
        return index;

    }

    /**
     *
     * @param str Receieves a string with all the possible plays from a Piece, in form play1 ; play2 ;
     * @return a String array with the plays correctly formatted to be treated by logic in form (Line Column PieceToMove Line Column) + exceptions
     */
    retrievePossibleMovesList(str){
        parts = str.split("\\;");
        return parts;
    }


      /**
     * flipBoard rotates the board, and calls InvertAllPieces So  that the info of the Pieces is corrected after the board rotation
     */
    flipBoard() {
        temp;

        for (var i=0;i<32;i++) {
            var r=i/8, c=i%8;
            if (BoardLogic.chessBoard[r][c]==BoardLogic.chessBoard[r][c].toUpperCase()) {
                temp = BoardLogic.chessBoard[r][c].toLowerCase(); //lowercase, change to upper
            } else {
                temp=BoardLogic.chessBoard[r][c].toUpperCase();
            }
            if (BoardLogic.chessBoard[7-r][7-c]==BoardLogic.chessBoard[7-r][7-c].toUpperCase()) {
                BoardLogic.chessBoard[r][c]= BoardLogic.chessBoard[7-r][7-c].toLowerCase();
            } else {
                BoardLogic.chessBoard[r][c]= BoardLogic.chessBoard[7-r][7-c].toUpperCase();
            }
            BoardLogic.chessBoard[7-r][7-c]=temp;
        }

        var kingTemp=kingPositionC;
        kingPositionC=63-kingPositionL;
        kingPositionL=63-kingTemp;

        invertAllPiecesInfo();
    }



    invertAllPiecesInfo(){
        for(var i=0; i < this.bishopPieces.length; i++){
            if(this.bishopPieces[i].getSymbol()==this.bishopPieces[i].getSymbol().toUpperCase()){
                this.bishopPieces[i].setSymbol(this.bishopPieces[i].getSymbol().toLowerCase());
            }
            else{
                this.bishopPieces[i].setSymbol(this.bishopPieces[i].getSymbol().toUpperCase());
            }
            this.bishopPieces[i].setPosOnBoard(63-this.bishopPieces[i].getPosOnBoard());
        }

        for(var i=0; i < this.queenPieces.length; i++){
            if(this.queenPieces[i].getSymbol()==this.queenPieces[i].getSymbol().toUpperCase()){
                this.queenPieces[i].setSymbol(this.queenPieces[i].getSymbol().toLowerCase());
            }
            else{
                this.queenPieces[i].setSymbol(this.queenPieces[i].getSymbol().toUpperCase());
            }
            this.queenPieces[i].setPosOnBoard(63-this.queenPieces[i].getPosOnBoard());
        }

        for(var i=0; i < this.kingPieces.length; i++){
            if(this.kingPieces[i].getSymbol()==this.kingPieces[i].getSymbol().toUpperCase()){
                this.kingPieces[i].setSymbol(this.kingPieces[i].getSymbol().toLowerCase());
            }
            else{
                this.kingPieces[i].setSymbol(this.kingPieces[i].getSymbol().toUpperCase());
            }
            this.kingPieces[i].setPosOnBoard(63-this.kingPieces[i].getPosOnBoard());
        }

        for(var i=0; i < this.pawnPieces.length; i++){
            if(this.pawnPieces[i].getSymbol()==this.pawnPieces[i].getSymbol().toUpperCase()){
                this.pawnPieces[i].setSymbol(this.pawnPieces[i].getSymbol().toLowerCase());
            }
            else{
                this.pawnPieces[i].setSymbol(this.pawnPieces[i].getSymbol().toUpperCase());
            }
            this.pawnPieces[i].setPosOnBoard(63-this.pawnPieces[i].getPosOnBoard());
        }

        for(var i=0; i < this.rookPieces.length; i++){
            if(this.rookPieces[i].getSymbol()== this.rookPieces[i].getSymbol().toUpperCase()){
                this.rookPieces[i].setSymbol(this.rookPieces[i].getSymbol().toLowerCase());
            }
            else{
                this.rookPieces[i].setSymbol(this.rookPieces[i].getSymbol().toUpperCase());
            }
            this.rookPieces[i].setPosOnBoard(63-this.rookPieces[i].getPosOnBoard());
        }

        for(var i=0; i < this.knightPieces.length; i++){
            if(this.knightPieces[i].getSymbol()== this.knightPieces[i].getSymbol().toUpperCase()){
                this.knightPieces[i].setSymbol(this.knightPieces[i].getSymbol().toLowerCase());
            }
            else{
                this.knightPieces[i].setSymbol(this.knightPieces[i].getSymbol().toUpperCase());
            }
            this.knightPieces[i].setPosOnBoard(63-this.knightPieces[i].getPosOnBoard());
        }
    }


    printBoardChess(){
        for (var i = 0; i < BoardLogic.chessBoard.length; i++){
            for (var j = 0; j < BoardLogic.chessBoard[i].length; j++){
                console.log(BoardLogic.chessBoard[i][j]);
               console.log(" ");
            }
          console.log("\n");
        }
    }

    findPawn(pos){
        for(var i = 0; i < this.pawnPieces.length; i++){
            if(this.pawnPieces[i].getPosOnBoard() == pos)
                return this.pawnPieces[i];
        }

        return null;
    }

}

BoardLogic.chessBoard=[
    ['r','k','b','q','a','b','k','r'],
    ['p','p','p','p','p','p','p','p'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p',' ',' ',' ','p',' ',' '],
    [' ',' ',' ','Q',' ',' ',' ',' '],
    [' ',' ',' ',' ','P',' ',' ',' '],
    ['P','P','P','P','P','P','P','P'],
    ['R','K','B','Q','A','B','K','R']
];
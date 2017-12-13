class BoardLogic{
    constructor(board){
         //public variables
        this.kingNotSafe=false; 
        this.gameOver=false;

        this.castleWhiteLong=true,this.castleWhiteShort=true,this.castleBlackLong=true,this.castleBlackShort=true;
        
        //get king's location
        this.kingPositionC=0,this.kingPositionL=0;
        while ('A' != BoardLogic.chessBoard[this.kingPositionC/8][this.kingPositionC%8]) {this.kingPositionC++;}
        while ('a' != BoardLogic.chessBoard[this.kingPositionL/8][this.kingPositionL%8]) {this.kingPositionL++;}
       
        //initializes arrays with the constructed pieces in play array<PieceType>
        var kingPieces=[];
        var queenPieces=[];
        var bishopPieces=[];
        var knightPieces=[];
        var pawnPieces=[];
        var rookPieces=[];
        
    }

    //getters,setters and adds

   getKingPieces() {
        return kingPieces;
    }

   getQueenPieces() {
        return queenPieces;
    }

    getRookPieces() {
        return rookPieces;
    }

    getPawnPieces() {
        return pawnPieces;
    }

    getBishopPieces() {
        return bishopPieces;
    }

    getKnightPieces() {
        return knightPieces;
    }

    addKingPieces(kingPiece) {
        this.kingPieces.add(kingPiece);
    }

   addQueenPieces(queenPiece) {
        this.queenPieces.add(queenPiece);
    }

   addRookPieces(rookPiece) {
        this.rookPieces.add(rookPiece);
    }

    addPawnPieces(pawnPiece) {
        this.pawnPieces.add(pawnPiece);
    }

    delPawn(pos){
        for(var i = 0; i < this.pawnPieces.length; i++){
            if(this.pawnPieces[i].getPosOnBoard() == pos)
                this.pawnPieces.splice(i,i+1);
        }
    }

    addBishopPieces(bishopPiece) {
        this.bishopPieces.add(bishopPiece);
    }

    addKnightPieces(knightPiece) {
        this.knightPieces.add(knightPiece);
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

    
}

BoardLogic.chessBoard=[
    ['r','k','b','q','a','b','k','r'],
    ['p','p','p','p','p','p','p','p'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P','P','P','P','P','P','P','P'],
    ['R','K','B','Q','A','B','K','R']
];
class BoardLogic{
    constructor(board){
         //public variables
        this.kingNotSafe=false; 
        this.gameOver=false;
		this.chessBoard = BoardLogic.chessBoard;
        this.castleWhiteLong=true,this.castleWhiteShort=true,this.castleBlackLong=true,this.castleBlackShort=true;
        this.kingPositionC=this.kingPositionL=0;

        if(board!=null){
            this.chessBoard=board;
        }
        for(var i=0;i<this.chessBoard.length;i++){
            for(var k=0;k<this.chessBoard[i].length;k++){
                
                if(this.chessBoard[i][k]=='A'){
                    break;
                }
                this.kingPositionC++;
            }
        }

         for(var i=0;i<this.chessBoard.length;i++){
            for(var k=0;k<this.chessBoard.length;k++){
               
                if(this.chessBoard[i][k]=='a'){
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
        var temp=new Array(8);
        for (var i = 0; i < temp.length; ++i) {
            temp[i] = new Array(8);
          }
      

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


        /**
     *
     * @param pos of Piece on the Board
     * @return if a king is in pos returns the type King class
     */
    findKing(pos){
        for(var i = 0; i < this.kingPieces.length; i++){
            if(this.kingPieces[i].getPosOnBoard() == pos)
                return this.kingPieces[i];
        }

        return null;
    }

    /**
     *
     * @param pos of Piece on the Board
     * @return if a queen is in pos returns the type Queen class
     */
    findQueen(pos){
        for(var i = 0; i < this.queenPieces.length; i++){
            if(this.queenPieces[i].getPosOnBoard() == pos)
                return this.queenPieces[i];
        }

        return null;
    }


    /**
     *
     * @param pos of Piece on the Board
     * @return if a knight is in pos returns the type Knight class
     */
    findKnight(pos){
        for(var i = 0; i < this.knightPieces.length; i++){
            if(this.knightPieces[i].getPosOnBoard() == pos)
                return this.knightPieces[i];
        }

        return null;
    }


    /**
     *
     * @param pos of Piece on the Board
     * @return if a rook is in pos returns the type Rook class
     */
    findRook(pos){
        for(var i = 0; i < this.rookPieces.length; i++){
            if(this.rookPieces[i].getPosOnBoard() == pos)
                return this.rookPieces[i];
        }

        return null;
    }


    /**
     *
     * @param pos of Piece on the Board
     * @return if a bishop is in pos returns the type Bishop class
     */
    findBishop(pos){
        for(var i = 0; i < this.bishopPieces.length; i++){
            if(this.bishopPieces[i].getPosOnBoard() == pos)
                return this.bishopPieces[i];
        }

        return null;
    }


    /**
     *
     *
     * @param pos Position of player on Board 0-63, function goes on to find the piece in that pos
     * @return String with all possible moves of the piece in the form (Line Column PieceToMove Line Column) + 'C' + PieceToTake + 'p'
     */
    findJogada(pos){
        if(this.findKing(pos) != null){
            return this.findKing(pos).possibleMove(this);
        }
       /* else if(findQueen(pos) != null){
            return this.findQueen(pos).possibleMove(this);
        }*/
        if(this.findPawn(pos) != null){
            return this.findPawn(pos).possibleMove(this);
        }
      /*  else if(this.findKnight(pos) != null){
            return this.findKnight(pos).possibleMove(this);
        }
        else if(this.findRook(pos) != null){
            return this.findRook(pos).possibleMove(this);
        }
        else if(this.findBishop(pos) != null){
            return this.findBishop(pos).possibleMove(this);
        }*/

        return null;
    }

    kingSafe() {
        //bishop/queen
        var temp=1;
        for (var i=-1; i<=1; i+=2) {
            for (var j=-1; j<=1; j+=2) {
                try {
                    while(' ' == BoardLogic.chessBoard[this.kingPositionC/8+temp*i][this.kingPositionC%8+temp*j]) {temp++;}
                    if ('b' == BoardLogic.chessBoard[this.kingPositionC/8+temp*i][this.kingPositionC%8+temp*j] ||
                            'q' == BoardLogic.chessBoard[this.kingPositionC/8+temp*i][this.kingPositionC%8+temp*j]) {
                        return false;
                    }
                } catch (e) {}
                temp=1;
            }
        }
        //rook/queen
        for (var i=-1; i<=1; i+=2) {
            try {
                while(' ' == BoardLogic.chessBoard[this.kingPositionC/8][this.kingPositionC%8+temp*i]) {temp++;}
                if ('r' == BoardLogic.chessBoard[this.kingPositionC/8][this.kingPositionC%8+temp*i] ||
                        'q' == BoardLogic.chessBoard[this.kingPositionC/8][this.kingPositionC%8+temp*i]) {
                    return false;
                }
            } catch (e) {}
            temp=1;
            try {
                while(' ' == BoardLogic.chessBoard[this.kingPositionC/8+temp*i][this.kingPositionC%8]) {temp++;}
                if ('r' == BoardLogic.chessBoard[this.kingPositionC/8+temp*i][this.kingPositionC%8] ||
                        'q' == BoardLogic.chessBoard[this.kingPositionC/8+temp*i][this.kingPositionC%8]) {
                    return false;
                }
            } catch (e) {}
            temp=1;
        }
        //knight
        for (var i=-1; i<=1; i+=2) {
            for (var j=-1; j<=1; j+=2) {
                try {
                    if ('k' == BoardLogic.chessBoard[this.kingPositionC/8+i][this.kingPositionC%8+j*2]) {
                        return false;
                    }
                } catch (e) {}
                try {
                    if ('k' == BoardLogic.chessBoard[this.kingPositionC/8+i*2][this.kingPositionC%8+j]) {
                        return false;
                    }
                } catch (e) {}
            }
        }
        //pawn
        if (this.kingPositionC>=16) {
            try {
                if ('p' == BoardLogic.chessBoard[this.kingPositionC/80-1][this.kingPositionC%8-1]) {
                    return false;
                }
            } catch (e) {}
            try {
                if ('p' == BoardLogic.chessBoard[this.kingPositionC/80-1][this.kingPositionC%8+1]) {
                    return false;
                }
            } catch (e) {}
            //king
            for (var i=-1; i<=1; i++) {
                for (var j=-1; j<=1; j++) {
                    if (i!=0 || j!=0) {
                        try {
                            if ('a' == BoardLogic.chessBoard[this.kingPositionC/8+i][this.kingPositionC%8+j]) {
                                return false;
                            }
                        } catch (e) {}
                    }
                }
            }
        }
        return true;
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
class Pieces {
    //string symbol,pos 0-63,playerColor boolean
    constructor(sym,pos,playerColor){
        this.symbol = sym;
        this.inGame = true;
        this.posOnBoard = pos;
        this.playerColor = playerColor;
        this.actualPossibleMoves; //string w/ all possible moves, format Line Column Symbol NextLine NextColumn (+ or not oldPiece) ex:24R27 -> rook from 24 to 27
    }
    naoFazNada(){
        return null;
    }
    getPosOnBoard(){
        return this.posOnBoard;
    }
    setPosOnBoard(posOnBoard) {//0-63
        this.posOnBoard = posOnBoard;
    }

    setOutOfGame(){ //piece got removed from Pieces Array in BoardLogic
        this.inGame = false;
    }

    setSymbol(symbol) {
        this.symbol = symbol;
    }

    /**
     *
     * @param x Line on Board
     * @param y Column on Board
     * @return Position 0-63 on board
     */
//castling (returns move as 0kingColumn,1rookColumn,2kingNewColumn,3rookNewColumn,4C

    /**
     *
     * @param move A Possible move for a piece
     * @param board an instance of GameLogic
     *              This function updates the information on the board according to the move recieved,
     *              in case of 24B35p it would delete a pawn from the Board, and move the bishop from position (2,4) to (3,5)
     */
    setNewMove(move,board){
        if(move.charAt(5)=='C') {
            board.getChessBoard()[7][parseInt(move.charAt(0))] = ' ';
            board.getChessBoard()[7][parseInt(move.charAt(1))] = ' ';
            board.getChessBoard()[7][parseInt(move.charAt(3))] = 'A';
            board.getChessBoard()[7][parseInt(move.charAt(4))] = 'R';
            board.kingPositionC = 56 + parseInt(move.charAt(3));//updates the king position (56=8*7)


            this.posOnBoard = board.calculatePos(7, parseInt(move.charAt(3)));
            board.findRook(board.calculatePos(7, parseInt(move.charAt(1)))).setPosOnBoard(board.calculatePos(7, parseInt(move.charAt(4))));
            

        }
        else {
            board.getChessBoard()[parseInt(move.charAt(0))][parseInt(move.charAt(1))] = " ";
            board.getChessBoard()[parseInt(move.charAt(3))][parseInt(move.charAt(4))] = this.symbol;

            if (move.charAt(5) != ' ') {
                var char = move.charAt(5);
                switch (char){
                    case 'p':
                        board.delPawn(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                        break;
                    case 'q':
                        board.delQueen(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                        break;
                    case 'r':
                        board.delRook(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                        break;
                    case 'k':
                        board.delknight(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                        break;
                    case 'b':
                        board.delBishop(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                        break;
                }
            }
            this.posOnBoard = board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4)));

            var pos = 0;

            if ('A' == board.getChessBoard()[parseInt(move.charAt(3))][parseInt(move.charAt(4))]) {
                board.kingPositionC = 8 * parseInt(move.charAt(3)) + parseInt(move.charAt(4));

            }
        }
    }

    
};





class Pawn extends Pieces{
    constructor(sym, pos, playerColor){
        super(sym,pos,playerColor);
        this.possibleMoves=[]; //especificado no formato: Linha x Coluna x Linha-PeçaQueCome x Coluna-PeçaQueCome (caso nao coma LinhaxColunaxfxf)
    }
    /**
     *
     * @param chessBoard given an instance of the gameLogic
     * @return Returns a String with All the possible moves that this. Pawn has in form Line Column P NextLine NextColumn + or not oldPiece
     *
     */
    possibleMove(chessBoard){
        var list = ""; var oldPiece;
        var r=this.posOnBoard/8, c=this.posOnBoard%8;

        for (var j=-1; j<=1; j+=2) {
            try {//capture
               // if (Character.isLowerCase(chessBoard.getChessBoard()[r-1][c+j]) && this.posOnBoard>=16) 
               if(chessBoard.getChessBoard()[r-1][c+j]==chessBoard.getChessBoard()[r-1][c+j].getSymbol().toLowerCase() && this.posOnBoard>=16){
                    oldPiece=chessBoard.getChessBoard()[r-1][c+j];
                    chessBoard.getChessBoard()[r][c]=' ';
                    chessBoard.getChessBoard()[r-1][c+j]='P';
                    if (chessBoard.kingSafe()) {
                        list=list+r+c+this.symbol+(r-1)+(c+j)+oldPiece+';';
                    }
                    chessBoard.getChessBoard()[r][c]='P';
                    chessBoard.getChessBoard()[r-1][c+j]=oldPiece;
                }
            } catch (e) {this.naoFazNada();}
            try {//promotion && capture
                if (Character.isLowerCase(chessBoard.getChessBoard()[r-1][c+j]) && this.posOnBoard<16) { // duvida
                    temp=['Q','R','B','K'];
                    for (var k=0; k<4; k++) {
                        oldPiece=chessBoard.getChessBoard()[r-1][c+j];
                        chessBoard.getChessBoard()[r][c]=' ';
                        chessBoard.getChessBoard()[r-1][c+j]=temp[k];
                        if (chessBoard.kingSafe()) {
                            //column1,column2,captured-piece,new-piece,P
                            list=list+c+(c+j)+this.symbol+oldPiece+temp[k]+'P'+' '+';';
                        }
                        chessBoard.getChessBoard()[r][c]='P';
                        chessBoard.getChessBoard()[r-1][c+j]=oldPiece;
                    }
                }
            } catch (e) {this.naoFazNada();}
        }
        try {//move one up
            if (' ' == chessBoard.getChessBoard()[r-1][c] && this.posOnBoard>=16) {
                oldPiece=chessBoard.getChessBoard()[r-1][c];
                chessBoard.getChessBoard()[r][c]=' ';
                chessBoard.getChessBoard()[r-1][c]='P';
                if (chessBoard.kingSafe()) {
                    list=list+r+c+this.symbol+(r-1)+c+oldPiece+';';
                }
                chessBoard.getChessBoard()[r][c]='P';
                chessBoard.getChessBoard()[r-1][c]=oldPiece;
            }
        } catch (e) {this.naoFazNada();}
        try {//promotion && no capture
            if (' ' == chessBoard.getChessBoard()[r-1][c] && this.posOnBoard<16) {
                temp=['Q','R','B','K'];
                for (var k=0; k<4; k++) {
                    oldPiece=chessBoard.getChessBoard()[r-1][c];
                    chessBoard.getChessBoard()[r][c]=' ';
                    chessBoard.getChessBoard()[r-1][c]=temp[k];
                    if (chessBoard.kingSafe()) {
                        //column1,column2,this-piece,captured-piece,new-piece,P
                        list=list+c+c+this.symbol+oldPiece+temp[k]+'P'+' '+';';
                    }
                    chessBoard.getChessBoard()[r][c]='P';
                    chessBoard.getChessBoard()[r-1][c]=oldPiece;
                }
            }
        } catch (e) {this.naoFazNada();}
        try {//move two up
            if (' ' == chessBoard.getChessBoard()[r-1][c] && ' ' == chessBoard.getChessBoard()[r-2][c] && this.posOnBoard>=48) {
                oldPiece=chessBoard.getChessBoard()[r-2][c];
                chessBoard.getChessBoard()[r][c]=' ';
                chessBoard.getChessBoard()[r-2][c]='P';
                if (chessBoard.kingSafe()) {
                    list=list+r+c+this.symbol+(r-2)+c+oldPiece+';';
                }
                chessBoard.getChessBoard()[r][c]='P';
                chessBoard.getChessBoard()[r-2][c]=oldPiece;
            }
        } catch (e) {this.naoFazNada();}

        this.actualPossibleMoves = list;
        return list;
    }
};



class King extends Pieces {
      constructor(sym, pos, playerColor){
        super(sym,pos,playerColor);
        this.possibleMoves=[]; //especificado no formato: Linha x Coluna x Linha-PeçaQueCome x Coluna-PeçaQueCome (caso nao coma LinhaxColunaxfxf)
    }
     naoFazNada(){};
    /**
     *
     * @param chessBoard given an instance of the gameLogic
     * @return Returns a String with All the possible moves that this. King has in form Line Column A NextLine NextColumn   ( + oldPiece or +'C') when possibility to castle
     * in case of castle it returns as KingOldColumn RookOldColumn K KingNewColumn RookNewColumn C
     *
     */


    possibleMove(chessBoard){
        var list="";
        var oldPiece;
        var r=this.posOnBoard/8, c=this.posOnBoard%8;
        for (var j=0; j<9; j++) {
            if (j!=4) {
                try {
                    // if (BoardLogic.chessBoard[r][c]==BoardLogic.chessBoard[r][c].toUpperCase()) 
                   // if (Character.isLowerCase(chessBoard.getChessBoard()[r-1+j/3][c-1+j%3]) || ' ' == chessBoard.getChessBoard()[r-1+j/3][c-1+j%3])
                   if (chessBoard.getChessBoard()[r-1+j/3][c-1+j%3]==chessBoard.getChessBoard()[r-1+j/3][c-1+j%3].toLowerCase() || ' ' == chessBoard.getChessBoard()[r-1+j/3][c-1+j%3]) {
                        oldPiece=chessBoard.getChessBoard()[r-1+j/3][c-1+j%3];
                        chessBoard.getChessBoard()[r][c]=' ';
                        chessBoard.getChessBoard()[r-1+j/3][c-1+j%3]='A';
                        var kingTemp=chessBoard.kingPositionC;
                        chessBoard.kingPositionC=this.posOnBoard+(j/3)*8+j%3-9;
                        if (chessBoard.kingSafe()) {
                            list=list+r+c+this.symbol+(r-1+j/3)+(c-1+j%3)+oldPiece+';';
                        }
                        chessBoard.getChessBoard()[r][c]='A';
                        chessBoard.getChessBoard()[r-1+j/3][c-1+j%3]=oldPiece;
                        chessBoard.kingPositionC=kingTemp;
                    }
                } catch (e) {naoFazNada();}
            }
        }

        //castling (returns move as kingColumn,rookColumn,kingNewColumn,rookNewColumn,C
        if ('A'==chessBoard.getChessBoard()[7][4] && BoardLogic.castleWhiteLong && 'R'==chessBoard.getChessBoard()[7][0] && ' '==chessBoard.getChessBoard()[7][1] && ' '==(chessBoard.getChessBoard()[7][2]) && ' '==chessBoard.getChessBoard()[7][3]) {
            var temp=false;
            for (var j=1;j<=2;j++) {
                chessBoard.makeKingMove("747"+j+" ");
                temp=(temp || !chessBoard.kingSafe());
                chessBoard.undoKingMove("747"+j+" ");
            }
            if (!temp) {
                //all criteria have been met:
                //System.out.println("White Castle Long");
                list+="40A23C ;";
            }
        }
        if ('A'==(chessBoard.getChessBoard()[7][4]) && BoardLogic.castleWhiteShort && 'R'==(chessBoard.getChessBoard()[7][7]) && ' '==(chessBoard.getChessBoard()[7][5]) && ' '==(chessBoard.getChessBoard()[7][6])) {
            var temp=false;
            for (var j=5;j<=6;j++) {
                chessBoard.makeKingMove("747"+j+" ");
                temp=(temp || !chessBoard.kingSafe());
                chessBoard.undoKingMove("747"+j+" ");
            }
            if (!temp) {
                //all criteria have been met:
                //System.out.println("White Castle Short");
                list+="47A65C ;";
            }
        }
        if ('A'==(chessBoard.getChessBoard()[7][3]) && BoardLogic.castleBlackLong && 'R'==(chessBoard.getChessBoard()[7][7]) && ' '==(chessBoard.getChessBoard()[7][4]) && ' '==(chessBoard.getChessBoard()[7][5]) && ' '==(chessBoard.getChessBoard()[7][6])) {
            var temp=false;
            for (var j=4;j<=5;j++) {
                chessBoard.makeKingMove("747"+j+" ");
                temp=(temp || !chessBoard.kingSafe());
                chessBoard.undoKingMove("747"+j+" ");
            }
            if (!temp) {
                //all criteria have been met:
                //System.out.println("Black Castle Long");
                list+="37A54C ;";
            }
        }
        if ('A'==(chessBoard.getChessBoard()[7][3]) && BoardLogic.castleBlackShort && 'R'==(chessBoard.getChessBoard()[7][0]) && ' '==(chessBoard.getChessBoard()[7][1]) && ' '==(chessBoard.getChessBoard()[7][2])) {
            var temp=false;
            for (var j=1;j<=2;j++) {
                chessBoard.makeKingMove("747"+j+" ");
                temp=(temp || !chessBoard.kingSafe());
                chessBoard.undoKingMove("747"+j+" ");
            }
            if (!temp) {
                //all criteria have been met:
                //System.out.println("Black Castle Short");
                list+="30A12C ;";
            }
        //need to add casting later
        }
        return list;
    }
};

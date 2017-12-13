class Piece {
    //string symbol,pos 0-63,playerColor boolean
    constructor(sym,pos,playerColor){
        this.symbol = sym;
        this.inGame = true;
        this.posOnBoard = pos;
        this.playerColor = playerColor;
        this.actualPossibleMoves; //string w/ all possible moves, format Line Column Symbol NextLine NextColumn (+ or not oldPiece) ex:24R27 -> rook from 24 to 27
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
            board.getChessBoard()[parseInt(move.charAt(0))][parseInt(move.charAt(1))] = ' ';
            board.getChessBoard()[parseInt(move.charAt(3))][parseInt(move.charAt(4))] = this.symbol;

            if (move.charAt(5) != ' ') {
                switch (move.charAt(5)) {
                    case 'p':
                        board.delPawn(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                    case 'q':
                        board.delQueen(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                    case 'r':
                        board.delRook(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                    case 'k':
                        board.delknight(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                    case 'b':
                        board.delBishop(board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4))));
                }
            }
            this.posOnBoard = board.calculatePos(parseInt(move.charAt(3)), parseInt(move.charAt(4)));

            var pos = 0;

            if ('A' == board.getChessBoard()[parseInt(move.charAt(3))][parseInt(move.charAt(4))]) {
                board.kingPositionC = 8 * parseInt(move.charAt(3)) + parseInt(move.charAt(4));

            }
        }
    }

    
}

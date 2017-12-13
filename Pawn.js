class Pawn extends Piece {
    constructor(sym, pos, playerColor){
        super(sym,pos,playerColor);
        this.possibleMoves=[]; //especificado no formato: Linha x Coluna x Linha-PeçaQueCome x Coluna-PeçaQueCome (caso nao coma LinhaxColunaxfxf)
    }
   
}

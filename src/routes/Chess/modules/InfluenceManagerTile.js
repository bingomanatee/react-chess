import Position from './Position';
import _ from 'lodash';


export default class InfluenceManagerTile extends Position {
    constructor (row, column, manager) {
        super(row, column);
        this.piece = false;
        this._canMoveInto = [];
        this._manager = manager;
    }

    canBeMovedToFrom (pos) {
        for (let piece of this.canMoveInto) {
            if (piece.samePosition(pos)) {
                return true;
            }
        }
        return false;
    }

    addCanMoveInto (piece) {
        this.removeCanMoveInto(piece);
        this.canMoveInto.push(piece);
    }

    removePiece (piece) {
        this.removeCanMoveInto(piece);
        if (this.piece.id === piece.id) {
            this.piece = false;
        }
    }

    removeCanMoveInto (piece) {
        this._canMoveInto = this.canMoveInto.filter(cPiece => cPiece.id !== piece.id);
    }

    resetCanMoveInto () {
        this._canMoveInto = [];
    }

    get index () {
        return this._index;
    }

    get canMoveInto () {
        return this._canMoveInto;
    }

    /**
     *
     * @param val {Piece|*}
     */
    set piece (val) {
        this._piece = val;
    }

    /**
     *
     * @returns {Piece|*}
     */
    get piece () {
        return this._piece;
    }

    get blackPower () {
        let i = 0;
        for (let piece of this.canMoveInto) {
            if (!piece.color) {
                ++i;
            }
        }
        return i;
    }

    get whitePrivilege () {
        let i = 0;
        for (let piece of this.canMoveInto) {
            if (piece.color) {
                i += 1;
            }
        }
        return i;
    }

    get netInfluence () {
        let i = 0;
        for (let piece of this.canMoveInto) {
            if (piece.color) {
                ++i;
            } else {
                --i;
            }
        }
        return i;
    }

    get manager () {
        return this._manager;
    }
}

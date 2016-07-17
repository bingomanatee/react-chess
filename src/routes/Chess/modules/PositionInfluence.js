import Position from './Position';
import _ from 'lodash';
import dimensions from 'routes/Chess/modules/dimensions.json';

const TOWARDS_BLACK = -1;
const TOWARDS_WHITE = 1;

const getRow = (rowIndex) => dimensions.rows[rowIndex];
const getColumn = (colIndex) => dimensions.columns[colIndex];
const indexToName = (rowIndex, colIndex) => {
    if (Math.min(rowIndex, colIndex) < 0 || Math.max(rowIndex, colIndex) > 7) {
        return null;
    }
    try {
        var newPosition = new Position(getRow(rowIndex), getColumn(colIndex));
        return newPosition.toString();
    } catch (err) {
        console.log('error in indexToName: ', err);
        debugger;
    }
};

export default class PositionInfluence extends Position {
    constructor (row, column, index, piece) {
        super(row, column);
        this.piece = piece || false;
        this.pieces = [];
        this.blackInfluence = 0;
        this.whiteInfluence = 0;
        this._index = index;
        this._canMoveInto = [];
    }

    at (position) {
        return this.index[position.toString()];
    }

    canBeMovedToFrom (pos) {
        for (let piece of this.canMoveInto) {
            if (piece.samePosition(pos)) {
                return true;
            }
        }
        return false;
    }

    extendInfluence () {
        if (!this.piece) {
            return;
        }

        switch (this.piece.type) {
            case 'P':
                this.extendPawn();
                break;

            case 'B':
                this.extendBishop();
                break;

            case 'R':
                this.extendRook();
                break;

            case 'N':
                this.extendKnight();
                break;

            case 'K':
                this.extendKing();
                break;

            case 'Q':
                this.extendQueen();
                break;

            default:
                throw new Error(`cannot move ${this.piece.type}`)
        }
    }

    extendPawn () {
        var forward = this.piece.color ? TOWARDS_BLACK : TOWARDS_WHITE;
        var moves = [];
        const inFront = this.offset(forward, 0);
        if (!inFront.piece) {
            moves.push(inFront);
            if (!this.piece.moved) {
                const inFront2 = this.offset(2 * forward, 0);
                if (!inFront2.piece) {
                    moves.push(inFront2);
                }
            }
        }

        var lateralLeft = this.offset(forward, -1);
        if (lateralLeft && lateralLeft.piece) {
            moves.push(lateralLeft);
        }

        var lateralRight = this.offset(forward, 1);
        if (lateralRight && lateralRight.piece) {
            moves.push(lateralRight);
        }

        this.setInfluence(moves);
    }

    setInfluence (moves) {
        moves = _.compact(moves);

        if (!moves.length) {
            return;
        }

        if (this.piece.color) {
            for (let move of moves) {
                move.canMoveInto.push(this);
                move.whiteInfluence = move.whiteInfluence + 1;
            }
        } else {
            for (let move of moves) {
                move.canMoveInto.push(this);
                move.blackInfluence = move.blackInfluence + 1;
            }
        }

    }

    offset (rowOffset, columnOffset) {
        const rowIndex = rowOffset + this.rowIndex;
        const colIndex = columnOffset + this.columnIndex;
        if (Math.min(rowIndex, colIndex) < 0 || Math.max(rowIndex, colIndex) > 7) {
            return null;
        }
        return this.index[indexToName(rowIndex, colIndex)];
    }

    extendBishop (once) {
        const moves = this.goLine(1, 1, once)
            .concat(this.goLine(1, -1, once))
            .concat(this.goLine(-1, 1, once))
            .concat(this.goLine(-1, -1, once));

        this.setInfluence(moves);
    }

    offsetToName (rowOffset, colOffset) {
        let row = this.rowIndex;
        let col = this.columnIndex;
        row += rowOffset;
        col += colOffset;
        return indexToName(row, col);
    }

    goLine (rowOffset, colOffset, once) {
        let row = 0;
        let col = 0;
        let out = [];
        let blocked = false;
        do {
            row += rowOffset;
            col += colOffset;
            let name = this.offsetToName(row, col);
            if (name) {
                let nextI = this.index[name];
                if (nextI.piece) {
                    out.push(nextI);
                    blocked = true;
                } else {
                    out.push(nextI);
                }
            } else {
                blocked = true;
            }
        } while ((!blocked ) && (!once));

        return out;
    }

    extendRook (once) {
        const moves = this.goLine(1, 0, once)
            .concat(this.goLine(-1, 0, once))
            .concat(this.goLine(0, 1, once))
            .concat(this.goLine(0, -1, once));

        this.setInfluence(moves);
    }

    extendKnight () {
        let moves = [];
        for (let offset of [
            [-1, -2], [-1, 2], [1, -2], [1, 2],
            [-2, -1], [-2, 1], [2, -1], [2, 1]
        ]) {
            let name = this.offsetToName(offset[0], offset[1]);

            if (name) {
                let move = this.index[name];
                moves.push(move);
            }
        }

        this.setInfluence(moves);
    }

    extendKing () {
        this.extendRook(true);
        this.extendBishop(true);
    }

    extendQueen () {
        this.extendRook();
        this.extendBishop();
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

    set blackInfluence (val) {
        this._blackInfluence = val;
    }

    get blackInfluence () {
        return this._blackInfluence;
    }

    set whiteInfluence (val) {
        this._whiteInfluence = val;
    }

    get whiteInfluence () {
        return this._whiteInfluence;
    }

    get netInfluence () {
        return this.whiteInfluence - this.blackInfluence;
    }

    set pieces (val) {
        this._pieces = val;
    }

    get pieces () {
        return this._pieces;
    }
}

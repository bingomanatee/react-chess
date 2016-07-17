import InfluenceManagerTile from './InfluenceManagerTile';
import indexToName from './indexToName';
import dimensions from 'routes/Chess/modules/dimensions.json';

const TOWARDS_BLACK = -1;
const TOWARDS_WHITE = 1;

export default class InfluenceManager {

    constructor (pieces) {
        this._placeIndex = {};
        this._placeList = [];
        this._pieceIndex = [];
        this._pieceList = [];
        for (let row of dimensions.rows) {
            for (let col of dimensions.columns) {
                this.addInfluence(row, col);
            }
        }
        if (pieces) {
            for (let piece of pieces) {
                this.addPiece(piece, true);
            }
            this.recalculate();
        }
    }

    at (position) {
        return this.placeIndex[position.toString()];
    }

    get placeList () {
        return this._placeList;
    }

    get placeIndex () {
        return this._placeIndex;
    }

    get pieceIndex () {
        return this._pieceIndex;
    }

    get pieceList () {
        return this._pieceList;
    }

    addPiece (piece, delay) {
        this.pieceList.push(piece);
        this.pieceIndex[piece.id] = piece;
        const place = this.placeIndex[piece.toString()];
        if (place.piece) {
            this.removePiece(place.piece);
        }
        place.piece = piece;
    }

    removePiece (piece, delay) {
        for (let place of this.placeList) {
            place.removePiece(piece);
        }
        if (!delay) {
            this.recalculate();
        }
    }

    addInfluence (row, column) {
        const newInfluence = new InfluenceManagerTile(row, column, this);
        this.placeList.push(newInfluence);
        this.placeIndex[newInfluence.toString()] = newInfluence;
    }

    recalculate () {
        for (let place of this.placeList) {
            place.resetCanMoveInto();
        }

        for (let piece of this.pieceList) {
            for (let place of this.getPieceMoves(piece)) {
                place.addCanMoveInto(piece);
            }
        }
    }

    getPieceMoves (piece) {
        let moves;
        switch (piece.type) {
            case 'P':
                moves = this.extendPawn(piece);
                break;

            case 'B':
                moves = this.extendBishop(piece);
                break;

            case 'R':
                moves = this.extendRook(piece);
                break;

            case 'N':
                moves = this.extendKnight(piece);
                break;

            case 'K':
                moves = this.extendKing(piece);
                break;

            case 'Q':
                moves = this.extendQueen(piece);
                break;

            default:
                throw new Error(`cannot move ${piece.type}`)
        }
        return _.compact(moves);
    }

    /** piece influence **/

    offset (pos, rowOffset = 0, columnOffset = 0) {
        if (!pos) {
            throw new Error('offset requires pos');
        }
        const rowIndex = rowOffset + pos.rowIndex;
        const colIndex = columnOffset + pos.columnIndex;

        const name = indexToName(rowIndex, colIndex);
        if (!name) {
            return null;
        }
        return this.placeIndex[name];
    }

    extendPawn (piece) {
        var forward = piece.color ? TOWARDS_BLACK : TOWARDS_WHITE;
        var moves = [];
        const inFront = this.offset(piece, forward, 0);

        if (!(inFront && inFront.piece)) {
            moves.push(inFront);
            if (!piece.moved) {
                const inFront2 = this.offset(piece, 2 * forward, 0);
                if (!(inFront2 && inFront2.piece)) {
                    moves.push(inFront2);
                }
            }
        }

        var lateralLeft = this.offset(piece, forward, -1);
        if (lateralLeft && lateralLeft.piece) {
            moves.push(lateralLeft);
        }

        var lateralRight = this.offset(piece, forward, 1);
        if (lateralRight && lateralRight.piece) {
            moves.push(lateralRight);
        }

        return moves;
    }

    extendBishop (piece, once) {
        let upRight = this.goLine(piece, 1, 1, once);
        let upLeft = this.goLine(piece, 1, -1, once);
        let lowRight = this.goLine(piece, -1, 1, once);
        let lowLeft = this.goLine(piece, -1, -1, once);
        return upRight.concat(upLeft).concat(lowRight).concat(lowLeft);
    }

    offsetToName (piece, rowOffset, colOffset) {
        let row = piece.rowIndex;
        let col = piece.columnIndex;
        row += rowOffset;
        col += colOffset;
        return indexToName(row, col);
    }

    goLine (piece, rowDelta, colDelta, once) {
        let rowOffset = 0;
        let colOffset = 0;
        let out = [];
        let blocked = false;
        do {
            rowOffset += rowDelta;
            colOffset += colDelta;
            let name = this.offsetToName(piece, rowOffset, colOffset);
            if (name) {
                let nextI = this.placeIndex[name];
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

    extendRook (piece, once) {
        return this.goLine(piece, 1, 0, once)
            .concat(this.goLine(piece, -1, 0, once))
            .concat(this.goLine(piece, 0, 1, once))
            .concat(this.goLine(piece, 0, -1, once));
    }

    extendKnight (piece) {
        let moves = [];
        for (let offset of [
            [-1, -2], [-1, 2], [1, -2], [1, 2],
            [-2, -1], [-2, 1], [2, -1], [2, 1]
        ]) {
            let name = this.offsetToName(piece, offset[0], offset[1]);

            if (name) {
                moves.push(this.placeIndex[name]);
            }
        }
        return moves;
    }

    extendKing (piece) {
        return this.extendRook(piece, true).concat(
            this.extendBishop(piece, true)
        )
    }

    extendQueen (piece) {
        return this.extendRook(piece).concat(
            this.extendBishop(piece)
        )
    }
}

const typeRE = /^[KQRBNP]$/;
import Position from './Position';

let pieceId = 0;
export default class Piece extends Position {
    constructor (pieceType, isWhite, row, column) {
        super(row, column);
        this._id = ++pieceId;
        this.type = pieceType;
        this.color = isWhite;
        this.moved = false;
    }

    clone () {
        return new Piece(this.type, this.color, this.row, this.column);
    }

    get id () {
        return this._id;
    }

    moveTo(pos) {
        this.row = pos.row;
        this.column = pos.column;
        this.moved = true;
    }

    /**
     *
     * @param val {boolean}
     */
    set moved (val) {
        this._moved = !!val;
    }

    /**
     *
     * @returns {boolean|*}
     */
    get moved () {
        return this._moved;
    }

    /**
     *
     * @param val {String}
     */
    set type (val) {
        if (!typeRE.test(val)) {
            throw new Error('bad type: ' + val);
        }
        this._type = val;
    }

    /**
     *
     * @returns {String}
     */
    get type () {
        return this._type;
    }

    /**
     * @param val {boolean}
     */
    set color (val) {
        this._color = !!val;
    }

    get colorName () {
        return this.color ? 'white' : 'black';
    }

    /**
     *
     * @returns {boolean}
     */
    get color () {
        return this._color;
    }

    get name () {
        return `${this.colorName}${this.type}`;
    }
}

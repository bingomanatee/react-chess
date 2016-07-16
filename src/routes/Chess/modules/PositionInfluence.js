import Position from './Position';

export default class PositionInfluence extends Position {
    constructor (row, column, index) {
        super(row, column);
        this.pieces = [];
        this.blackInfluence = 0;
        this.whiteInfluence = 0;
        this._index = index;
    }

    get index () {
        return this._index;
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

    set pieces (val) {
        this._pieces = val;
    }

    get pieces () {
        return this._pieces;
    }
}

const columnRE = /^[abcdefgh]$/;

export default class Position {
    constructor (row, column) {
        this.row = row;
        this.column = column;
    }

    clone () {
        return new Position(this.row, this.column);
    }

    set row (val) {
        if (isNaN(val)) {
            throw new Error(`bad row ${val}`);
        }
        if (val < 1 || val > 8) {
            throw new Error(`val out of range ${val}`);
        }
        this._row = val;
    }

    get row () {
        return this._row;
    }

    set column (val) {
        if (!columnRE.test(val)) {
            throw new Error(`bad column ${val}`);
        }
        this._column = val;
    }

    get column () {
        return this._column;
    }

    /**
     *
     * @param pos {Position}
     * @returns {boolean}
     */
    equals(pos) {
        return this.row = pos.row && pos.column == this.column;
    }

    /**
     *
     * @param pos {Position}
     */
    update(pos) {
        this.row = pos.row;
        this.column = pos.column;
    }
}

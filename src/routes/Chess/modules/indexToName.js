"use strict";
import getRow from './getRow';
import getColumn from './getColumn';
import Position from './Position';

function indexToName (rowIndex, colIndex) {
    if (Math.min(rowIndex, colIndex) < 0 || Math.max(rowIndex, colIndex) > 7) {
        return null;
    }
    var pos = new Position(getRow(rowIndex), getColumn(colIndex));
    return pos.toString();
}

export default indexToName;

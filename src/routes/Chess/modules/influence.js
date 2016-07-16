import dimensions from './dimensions.json';
import _ from 'lodash';
import Influence from './PositionInfluence';

export default (pieces) => {
    var index = {};
    var board = _.flatten(dimensions.rows.map((row) => {
        return dimensions.columns.map((column) => new Influence(row, column, index));
    }));

    for (let pi of board) index[pi.toString()] = pi;

    for (let piece of pieces) {
        let pieceInfluence = index[piece.toString()];
        pieceInfluence.piece = piece;
    }

    return board;
}

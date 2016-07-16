import PiecePosition from './PiecePosition';
import dimensions from './dimensions.json';

// ------------------------------------
// Constants
// ------------------------------------
export const MOVE = 'MOVE';

// ------------------------------------
// Actions
// ------------------------------------
export function move (location, toLocation) {

    return {
        type: MOVE,
        payload: [location, toLocation]
    };
}

export const actions = {
    move
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MOVE]: (state, action) => {
        const moves = action.moves.push(action.payload);
        const fromPos = action.payload[0];
        const toPos = action.payload[1];
        const pieces = action.pieces.map(piece => {
            let newPiece = piece.clone();

            if (newPiece.equals(fromPos)) {
                newPiece.update(toPos);
            }
            return newPiece;
        });


    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    pieces: [
        new PiecePosition('R', true, 1, 'a'),
        new PiecePosition('R', true, 1, 'h'),
        new PiecePosition('N', true, 1, 'b'),
        new PiecePosition('N', true, 1, 'g'),
        new PiecePosition('B', true, 1, 'c'),
        new PiecePosition('B', true, 1, 'f'),
        new PiecePosition('K', true, 1, 'd'),
        new PiecePosition('Q', true, 1, 'e')
    ],
    moves: []
};
Object.assign(initialState, dimensions);

// clone black pieces
initialState.pieces = initialState.pieces.concat(
    initialState.pieces.map(p => new PiecePosition(p.type, false, 8, p.column))
);

// pawns
for (var column of dimensions.columns) {
    initialState.pieces.push(new PiecePosition('P', true, 2, column));
    initialState.pieces.push(new PiecePosition('P', false, 7, column))
}

const echo = (state) => state;
export const chessReducer = (state = initialState, action) => (ACTION_HANDLERS[action.type] || echo)(state, action);
export default chessReducer;

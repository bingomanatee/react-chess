import Piece from './Piece';
import dimensions from './dimensions.json';
import influence from './influence';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const MOVE = 'MOVE';
export const HOVER = 'HOVER';
export const MOVE_START = 'MOVE_START';
export const MOVE_COMPLETE = 'MOVE_COMPLETE';

// ------------------------------------
// Actions
// ------------------------------------
export function move (location, toLocation) {
    return {
        type: MOVE,
        payload: [location, toLocation]
    };
}
export function hover (position) {
    return {
        type: HOVER,
        payload: position
    };
}

export function moveStart (piece) {
    return {
        type: MOVE_START,
        payload: piece
    }
}

export function moveComplete (piece) {
    return {
        type: MOVE_COMPLETE,
        payload: piece
    }
}

export const actions = {
    move,
    hover,
    moveStart,
    moveComplete
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MOVE]: (state, action) => {
        /*  const moves = action.moves.push(action.payload);
         const fromPos = action.payload[0];
         const toPos = action.payload[1];
         const pieces = action.pieces.map(piece => {
         let newPiece = piece.clone();

         if (newPiece.samePosition(fromPos)) {
         newPiece.update(toPos);
         }
         return newPiece;
         });*/
    },

    [MOVE_START]: (state, action) => {
        return Object.assign({}, state, {moving: action.payload, hover: false});
    },

    [HOVER]: (state, action) => {
        if (state.moving) {
            return state;
        }
        return Object.assign({}, state, {hoveringOver: action.payload});
    },

    [MOVE_COMPLETE]: (state, action) => {
        let position = action.payload;
        if (position.samePosition(state.moving)) {
            return Object.assign({}, state, {moving: false, hover: state.move})
        }

        let pieces = _.compact(state.pieces.map(piece => {
            if (piece.samePosition(position)) {
                return false;
            }
            let out = piece.clone();
            if (out.samePosition(state.moving)){
                out.moveTo(position);
            }
            return out;
        }));

        let newState = Object.assign({}, state);
        newState.hoveringOver = false;
        newState.moving = false;
        newState.pieces = pieces;
        newState.influence = influence(pieces);
        newState.history = state.history.concat(pieces);
        return newState;
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    pieces: [
        new Piece('R', true, 1, 'a'),
        new Piece('R', true, 1, 'h'),
        new Piece('N', true, 1, 'b'),
        new Piece('N', true, 1, 'g'),
        new Piece('B', true, 1, 'c'),
        new Piece('B', true, 1, 'f'),
        new Piece('K', true, 1, 'd'),
        new Piece('Q', true, 1, 'e')
    ],
    moves: [],
    hoveringOver: false,
    moving: false,
    history: []
};
Object.assign(initialState, dimensions);

// clone black pieces
initialState.pieces = initialState.pieces.concat(
    initialState.pieces.map(p => new Piece(p.type, false, 8, p.column))
);

// pawns
for (var column of dimensions.columns) {
    initialState.pieces.push(new Piece('P', true, 2, column));
    initialState.pieces.push(new Piece('P', false, 7, column))
}

initialState.influence = influence(initialState.pieces);
initialState.history.push(initialState.pieces);

const echo = (state) => state;
export const chessReducer = (state = initialState, action) => (ACTION_HANDLERS[action.type] || echo)(state, action);
export default chessReducer;

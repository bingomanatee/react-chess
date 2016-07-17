import Piece from './Piece';
import dimensions from './dimensions.json';
import influence from './influence';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------

export const HOVER = 'HOVER';
export const MOVE_START = 'MOVE_START';
export const MOVE_COMPLETE = 'MOVE_COMPLETE';

// ------------------------------------
// Actions
// ------------------------------------

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

export function moveComplete (position) {
    return {
        type: MOVE_COMPLETE,
        payload: position
    }
}

export const actions = {
    hover,
    moveStart,
    moveComplete
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
        let movingPiece = state.moving;
        // @TODO: validate moving?

        if (position.samePosition(state.moving)) {
            return Object.assign({}, state, {moving: false, hover: state.move})
        }

        let takenPiece = false;
        let pieces = _.compact(state.pieces.map(piece => {
            if (piece.samePosition(position)) {
                takenPiece = piece;
                return false;
            }
            return piece;
        }));

        let newState = Object.assign({}, state);
        newState.hoveringOver = false;
        newState.moving = false;
        newState.pieces = pieces;
        newState.influence = influence(pieces);
        newState.history = state.history.concat(pieces);
        newState.whoseMove = !state.whoseMove;
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
    history: [],
    influence: [],
    whoseMove: true
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

// initialState.influence = influence(initialState.pieces);
initialState.history.push(initialState.pieces);

const echo = (state) => state;
export const chessReducer = (state = initialState, action) => (ACTION_HANDLERS[action.type] || echo)(state, action);
export default chessReducer;

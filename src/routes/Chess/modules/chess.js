import Piece from './Piece';
import dimensions from './dimensions.json';
import InfluenceManager from './InfluenceManager';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------

export const HOVER = 'HOVER';
export const MOVE_START = 'MOVE_START';
export const MOVE_COMPLETE = 'MOVE_COMPLETE';
export const MOVE_CANCEL = 'MOVE_CANCEL';

// ------------------------------------
// Actions
// ------------------------------------

export function hover (position) {
    console.log('HOVERING AT ', position.toString());
    return {
        type: HOVER,
        payload: position
    };
}

export function moveStart (piece) {
    console.log('MOVING FROM ', piece.name, piece.posIndex);
    return {
        type: MOVE_START,
        payload: piece
    }
}

export function moveComplete (position) {
    console.log('MOVING TO ', position.posIndex);
    return {
        type: MOVE_COMPLETE,
        payload: position
    }
}

export function moveCancel () {
    return {
        type: MOVE_CANCEL
    }
}

export const actions = {
    hover,
    moveStart,
    moveComplete,
    moveCancel
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MOVE_START]: (state, action) => {
        return Object.assign({}, state, {moving: action.payload, hover: false});
    },

    [MOVE_CANCEL]: (state) => {
        return Object.assign({}, state, {moving: false});
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
            return Object.assign({}, state, {moving: false});
        }

        let takenPiece = false;
        let pieces = _.compact(state.pieces.map(piece => {
            if (piece.samePosition(position)) {
                takenPiece = piece;
                return false;
            }
            return piece;
        }));

        if (takenPiece) {
            state.influence.removePiece(takenPiece);
        }
        state.influence.removePiece(movingPiece);
        movingPiece.moveTo(position);
        state.influence.addPiece(movingPiece);
        state.influence.recalculate();

        let newState = Object.assign({}, state);

        newState.hoveringOver = false;
        newState.moving = false;
        newState.pieces = pieces;
        newState.influence.recalculateFor(pieces);
        newState.history = state.history.concat(pieces);
        newState.whoseMove = !state.whoseMove;
        ++newState.turn;

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
    whoseMove: true,
    turn: 1
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

initialState.influence = new InfluenceManager(initialState.pieces);
initialState.history.push(initialState.pieces);

const echo = (state) => state;
export const chessReducer = (state = initialState, action) => (ACTION_HANDLERS[action.type] || echo)(state, action);
export default chessReducer;

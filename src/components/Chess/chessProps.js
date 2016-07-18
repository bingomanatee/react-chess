import {PropTypes} from 'react';

export default {
    turn: PropTypes.number,
    whoseMove: PropTypes.bool.isRequired,
    rows: PropTypes.array.isRequired,
    influence: PropTypes.object.isRequired,
    pieces: PropTypes.array.isRequired,
    hover: PropTypes.func.isRequired,
    moveStart: PropTypes.func.isRequired,
    moveComplete: PropTypes.func.isRequired,
    hoveringOver: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    moving: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ])
};

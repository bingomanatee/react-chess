import {PropTypes} from 'react';

export default {
    whoseMove: PropTypes.bool.isRequired,
    rows: PropTypes.array.isRequired,
    influence: PropTypes.array.isRequired,
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

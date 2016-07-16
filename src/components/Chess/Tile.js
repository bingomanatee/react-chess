import React from 'react';
import classes from './chess.scss';
// import Position from 'routes/Chess/modules/Position';

export const Tile = (props) => (
    <div className={classes.tile}>
        row {props.position.row}
        col {props.position.column}
    </div>
);

export default Tile;

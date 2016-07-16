import React, {PropTypes} from 'react';
import classes from './chess.scss';
// import Position from 'routes/Chess/modules/Position';
import _ from 'lodash';
import Piece from './Piece';

const oddStyle = (props) => {
    const row = props.position.row;
    const col = props.position.column;

    const rowOdd = _.indexOf(props.rows, row);
    const colOdd = _.indexOf(props.columns, col);

    return rowOdd % 2 === colOdd % 2;
};

export const Tile = (props) => {

    return (
        <div className={`${classes.tile} ${oddStyle(props) ? classes.tile__odd : ''}`}>
            <Influence {...props} />
            <Piece {...props} />
        </div>
    );
}

Tile.propTypes = {
    position: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
    influence: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    pieces: PropTypes.array.isRequired,
    move: PropTypes.func.isRequired
};

export default Tile;

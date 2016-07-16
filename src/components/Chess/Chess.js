import React from 'react';
import classes from './chess.scss';
import Position from 'routes/Chess/modules/Position';
import Tile from './Tile';

function board (rows, columns) {
    var out = [];
    for (let row of rows) {
        var tiles = [];
        for (let col of columns) {
            let position = new Position(row, col);
            tiles.push(<Tile position={position} />);
        }
        out.push(<div className={classes.row}>{tiles}</div>);
    }
    return out;
}

export const Counter = (props) => (
    <div>
        <h2>Chess</h2>
        <section className={classes.board}>
            {board(props.rows, props.columns)}
        </section>
    </div>
);

Counter.propTypes = {
    rows: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    pieces: React.PropTypes.array.isRequired,
    move: React.PropTypes.func.isRequired
};

export default Counter;

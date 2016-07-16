import React, {PropTypes} from 'react';
import classes from './chess.scss';
import Position from 'routes/Chess/modules/Position';
import Tile from './Tile';

export class Chess extends React.Component {
    static propTypes = {
        rows: PropTypes.array.isRequired,
        influence: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
        pieces: PropTypes.array.isRequired,
        move: PropTypes.func.isRequired
    };

    board (rows, columns) {
        var out = [];
        for (let row of rows) {
            var tiles = [];
            for (let col of columns) {
                let pos = new Position(row, col);
                tiles.push(<Tile {...this.props} key={pos.toString()} position={pos}/>);
            }
            out.push(<div key={`row${row}`} className={classes.row}>{tiles}</div>);
        }
        return out;
    }

    render () {
        return (
            <div className={classes.chessContainer}>
                <h2>Chess</h2>
                <section className={classes.board}>
                    {this.board(this.props.rows, this.props.columns)}
                </section>
            </div>
        )
    }
}

export default Chess;

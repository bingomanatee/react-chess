import React, {PropTypes} from 'react';
import classes from './chess.scss';
import Position from 'routes/Chess/modules/Position';
import Tile from './Tile';
import chessProps from './chessProps';

export class Chess extends React.Component {
    static propTypes = chessProps;

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

    moving() {
        if (this.props.moving) {
            return `(moving ${this.props.moving.name} from ${this.props.moving.toString()})`;
        } else {
            return '';
        }
    }

    render () {
        return (
            <div className={classes.chessContainer}>
                <h2>Chess {this.moving()}</h2>
                <section className={classes.board}>
                    {this.board(this.props.rows, this.props.columns)}
                </section>
            </div>
        )
    }
}

export default Chess;

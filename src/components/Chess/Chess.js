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
                tiles.push(<Tile {...this.props} key={pos.posIndex} position={pos}/>);
            }
            out.push(<div key={`row${row}`} className={classes.row}>{tiles}</div>);
        }
        return out;
    }

    moving () {
        if (this.props.moving) {
            return `(moving ${this.props.moving.name} from ${this.props.moving.posIndex})`;
        } else {
            return '';
        }
    }

    pieceList () {
        return !this.props.pieces.length ? '' : this.props.pieces.map((piece, i) => (<tr key={`${i}:${piece.name}`}>
            <td>{piece.id}</td>
            <td>{piece.name}</td>
            <td>{piece.posIndex}</td>
        </tr>));
    }

    render () {
        const tableStyle = {position: 'absolute', left: 0, top: 0, zIndex: 1000};
        return (
            <div className={classes.chessContainer}>
                <h2>Chess {this.moving()}</h2>
                <p>{this.props.whoseMove ? 'White' : 'Black'}'s move</p>
                <section className={classes.board}>
                    {this.board(this.props.rows, this.props.columns)}
                </section>
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Piece</th>
                        <th>at</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.pieceList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Chess;

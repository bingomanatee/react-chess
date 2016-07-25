import React, {PropTypes, Component} from 'react';
import classes from './chess.scss';
// import Position from 'routes/Chess/modules/Position';
import _ from 'lodash';
import Piece from './Piece';
import PieceHover from './Hover';
import chessProps from './chessProps';

const WARNING = 'rgb(204,0,0)';
const GRADIENTS = 3;
const GRADIENTS_DENOM = 6;

const oddStyle = (props) => {
    const row = props.position.row;
    const col = props.position.column;

    const rowOdd = _.indexOf(props.rows, row);
    const colOdd = _.indexOf(props.columns, col);

    return rowOdd % 2 === colOdd % 2;
};

export class Tile extends Component {

    static propTypes = chessProps;

    get myPiece () {
        return this.myTile.piece;
    }

    get myTile () {
        return this.props.influence.at(this.props.position);
    }

    mouseMove (e) {
        let myPiece = this.myPiece;
        if (this.props.moving) {
            return;
        }
        const tile = this.myTile;
        // console.log('at tile - hovering over', this.props.position.posIndex, myPiece ? myPiece.posIndex : '');

        if (myPiece.color !== this.props.whoseMove) {
            myPiece = false;
        }

        if (myPiece) {
            if (this.props.hoveringOver) {
                if (!myPiece.samePiece(this.props.hoveringOver)) {
                    this.props.hover(myPiece);
                }
            } else {
                this.props.hover(myPiece);
            }
        } else if (this.props.hoveringOver) {
            this.props.hover(false);
        }
    }

    mouseClick (e) {
        if (this.props.moving) {
            if (this.props.moving.samePosition(this.props.position)) {
                this.props.moveCancel();
            } else if (this.myTile.canBeMovedToByPiece(this.props.moving)) {
                if (this.myPiece && this.myPiece.color === this.props.moving.color) {
                    return;
                }
                this.props.moveComplete(this.props.position);
            }
        } else {
            const myPiece = this.myPiece;
            if (!(!myPiece || myPiece.color !== this.props.whoseMove)) {
                this.props.moveStart(myPiece);
            }
        }
        // @TODO: block unmovble pieces
    }

    get influenceColor () {
        const net = this.myTile.netInfluence;
        var opacity = Math.abs(Math.min(4, Math.max(-GRADIENTS, net)) / GRADIENTS_DENOM);
        if (net > 0) {
            return `rgba(255, 162,0,${opacity})`;
        } else if (net < 0) {
            return `rgba(63, 59, 154, ${opacity})`;
        } else {
            return '';
        }
    }

    style () {
        const out = {};
        const tile = this.myTile;

        if (tile.freeTake) {
            if (tile.piece.color) {
                out.borderColor = WARNING;
                out.borderWidth = 3;
            }
        }
        out.backgroundColor = this.influenceColor;
        return out;
    }

    render () {
        const props = this.props;

        return (
            <div key={`tile-${this.props.position.posIndex}`}
                 onMouseMove={this.mouseMove.bind(this)}
                 onMouseUp={this.mouseClick.bind(this)}
                 style={this.style()}
                 className={`${classes.tile} ${oddStyle(props) ? classes.tile__odd : ''}`}>
                <Piece key="p" piece={this.myPiece} position={this.props.position}/>
                <PieceHover key-="h" {...props} />
            </div>
        );
    }
}


export default Tile;

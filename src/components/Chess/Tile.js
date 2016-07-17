import React, {PropTypes, Component} from 'react';
import classes from './chess.scss';
// import Position from 'routes/Chess/modules/Position';
import _ from 'lodash';
import Piece from './Piece';
import Influence from './Influence';
import PieceHover from './Hover';
import chessProps from './chessProps';

const WARNING = 'rgb(204,0,0)';

const oddStyle = (props) => {
    const row = props.position.row;
    const col = props.position.column;

    const rowOdd = _.indexOf(props.rows, row);
    const colOdd = _.indexOf(props.columns, col);

    return rowOdd % 2 === colOdd % 2;
};

export class Tile extends Component {

    static propTypes = chessProps;

    myPiece () {
        const pos = this.props.position;
        return this.props.pieces.reduce((found, piece) => {
            if (piece && piece.samePosition(pos)) {
                return piece;
            }
            return found;
        }, false);
    }

    mouseMove (e) {
        const myPiece = this.myPiece();
        console.log('at tile - hovering over', this.props.position.toString(), myPiece ? myPiece.toString() : '');
        if (!myPiece) {
            if (this.props.hoveringOver) {
                this.props.hover(false);
            }
            return;
        }

        if (this.props.hoveringOver) {
            if (this.props.hoveringOver.samePosition(myPiece)) {
                return;
            } else {
                this.props.hover(myPiece);
            }
        } else {
            this.props.hover(myPiece);
        }
    }

    movingCanMoveTo() {
        const influence = this.props.influence[0].at(this.props.position);
        if (influence.canBeMovedToFrom(this.props.moving)){
            this.props.moveComplete(this.props.position);
        }
    }

    mouseClick (e) {
        const pos = this.props.position;
        if (this.props.moving) {
            if (this.props.moving.samePosition(pos)) {
                return;
            }
            if (this.movingCanMoveTo()){
                this.props.moveEnd(pos);
            }
        }
        const myPiece = this.myPiece();
        if (!myPiece) {
            return;
        }
        // @TODO: block unmovble pieces
        this.props.moveStart(myPiece);
    }

    style () {
        const out = {};

        const influence = this.props.influence[0].at(this.props.position);

        if (influence.piece && ((!!influence.blackInfluence) !== (!!influence.whiteInfluence))) {
            if (influence.blackInfluence) {
                if (influence.piece.color) {
                    out.borderColor= WARNING;
                    out.borderWidth=3;
                }
            } else {
                if (!influence.piece.color) {
                    out.borderColor= WARNING;
                    out.borderWidth=3;
                }
            }
        }

        return out;
    }

    render () {
        const props = this.props;

        return (
            <div onMouseMove={this.mouseMove.bind(this)} onMouseUp={this.mouseClick.bind(this)}
                 style={this.style()}
                 className={`${classes.tile} ${oddStyle(props) ? classes.tile__odd : ''}`}>
                <Influence key="i"{...props} />
                <Piece key="p" {...props} />
                <PieceHover key-="h" {...props} />
            </div>
        );
    }
}


export default Tile;

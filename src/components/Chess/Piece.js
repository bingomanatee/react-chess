import React, {PropTypes, Component} from 'react';
import classes from './chess.scss';
import chessProps from './chessProps';

import blackP from './images/blackP.svg';
import blackR from './images/blackR.svg';
import blackN from './images/blackN.svg';
import blackB from './images/blackB.svg';
import blackK from './images/blackK.svg';
import blackQ from './images/blackQ.svg';

import whiteP from './images/whiteP.svg';
import whiteR from './images/whiteR.svg';
import whiteN from './images/whiteN.svg';
import whiteB from './images/whiteB.svg';
import whiteK from './images/whiteK.svg';
import whiteQ from './images/whiteQ.svg';

var pieces = {
    blackP,
    blackR,
    blackN,
    blackB,
    blackK,
    blackQ,
    whiteP,
    whiteR,
    whiteN,
    whiteB,
    whiteK,
    whiteQ
};

class Piece extends Component {
    static  propTypes = chessProps;

    myPiece () {
        const pos = this.props.position;
        return this.props.pieces.reduce((found, piece) => {
            if (piece && piece.samePosition(pos)) {
                return piece;
            }
            return found;
        }, false);
    }

    render () {
        const props = this.props;

        const style = {
            backgroundSize: 'contain',
            backgroundPosition: 'center center'
        };

        var myPiece = this.myPiece();

        if (myPiece) {
            const image = pieces[myPiece.name];
            style.backgroundImage = `url(${image})`
        }

        return (<div key={`piece${props.position.toString()}`} className={classes.piece}
                     style={style}>
        </div>);
    }

}


export default Piece;

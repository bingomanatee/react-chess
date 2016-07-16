import React, {PropTypes} from 'react';
import classes from './chess.scss';
import _ from 'lodash';

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

export const Piece = (props) => {
    var myPiece = props.pieces.reduce((found, piece) => {
        if (piece && piece.equals(props.position)) return piece;
        return found;
    }, false);

    if (!myPiece) {
        return <span />;
    }
    const image = pieces[myPiece.name];
    const style = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center'
    };

    return (<div className={classes.piece} style={style}>
        </div>);
};

Piece.propTypes = {
    position: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pieces: PropTypes.array.isRequired,
    move: PropTypes.func.isRequired
};

export default Piece;

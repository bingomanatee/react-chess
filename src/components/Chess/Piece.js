import React, {PropTypes, Component} from 'react';
import classes from './chess.scss';
import util from 'util';
import chessProps from './chessProps';

import bP from './images/blackP.svg';
import bR from './images/blackR.svg';
import bN from './images/blackN.svg';
import bB from './images/blackB.svg';
import bK from './images/blackK.svg';
import bQ from './images/blackQ.svg';

import wP from './images/whiteP.svg';
import wR from './images/whiteR.svg';
import wN from './images/whiteN.svg';
import wB from './images/whiteB.svg';
import wK from './images/whiteK.svg';
import wQ from './images/whiteQ.svg';

var pieces = {
    bP,
    bR,
    bN,
    bB,
    bK,
    bQ,
    wP,
    wR,
    wN,
    wB,
    wK,
    wQ
}

class Piece extends Component {
    static propTypes = {
        piece: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ]),
        position: PropTypes.object.isRequired
    };

    render () {
        const props = this.props;

        const style = {};

        if (props.piece && props.piece.samePosition(props.position)) {
            const image = pieces[props.piece.name];
            style.backgroundImage = `url(${image})`
        }

        let id = <span className={classes.id} key="id">0</span>;
        if (props.piece) id = <span className={classes.id} key="id">{props.piece.id}</span>;

        return (<div key={`piece${props.position.posIndex}`} className={classes.piece}
                     style={style}>
            {id}
        </div>);
    }

}


export default Piece;

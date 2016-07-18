import React, {PropTypes} from 'react';
import classes from './chess.scss';
import chessProps from './chessProps';

import hoverFromImage from './images/hoverFrom.svg';
import hoverToImage from './images/hoverTo.svg';

export const Hover = (props) => {
    let style = {};
    const tile = props.influence.at(props.position);
    const myPiece = tile.piece;

    if (props.moving) {
        if (tile.hasPiece(props.moving)) {
            style.backgroundImage = `url(${hoverFromImage})`;
        } else if (tile.canBeMovedToByPiece(props.moving)) {
            style.backgroundImage = `url(${hoverToImage})`;
        }
    } else if (props.hoveringOver) {
        if (props.hoveringOver.samePosition(props.position)) {
            style.backgroundImage = `url(${hoverFromImage})`;
        } else if (tile.canBeMovedToByPiece(props.hoveringOver)) {
            if (!myPiece || (!myPiece.sameColor(props.hoveringOver))) {
                style.backgroundImage = `url(${hoverToImage})`;
            }
        }

    }

    return (<div key={`hover-${props.position.posIndex}`} className={classes.hover} style={style}>
    </div>);
};

Hover.propTypes = chessProps;

export default Hover;

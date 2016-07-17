import React, {PropTypes} from 'react';
import classes from './chess.scss';
import _ from 'lodash';
import chessProps from './chessProps';

import hoverFromImage from './images/hoverFrom.svg';
import hoverToImage from './images/hoverTo.svg';

export const Hover = (props) => {
    let hoverStyle = {};
    const influence = props.influence[0].at(props.position);
    const myPiece = influence.piece;

    if (props.moving) {
        if (props.moving.samePosition(props.position)) {
            hoverStyle.backgroundImage = `url(${hoverFromImage})`;
        } else {
            let isMoving = false;
            if (influence.canMoveInto.length) {
                for (let canMove of influence.canMoveInto) {
                    if (canMove.samePosition(props.moving)) {
                        if (!myPiece || myPiece.color !== canMove.piece.color) {
                            isMoving = true;
                            break;
                        }
                    }
                }
            }

            if (isMoving) {
                hoverStyle.backgroundImage = `url(${hoverToImage})`;
            }
        }
    } else if (!props.hoveringOver) {
        return <span />;
    } else if (props.hoveringOver.samePosition(props.position)) {
        hoverStyle.backgroundImage = `url(${hoverFromImage})`;
    } else {
        let canMoveTo = false;
        if (influence.canMoveInto.length) {
            for (let canMove of influence.canMoveInto) {
                if (canMove.samePosition(props.hoveringOver)) {
                    if (!myPiece || myPiece.color !== canMove.piece.color) {
                        canMoveTo = true;
                        break;
                    }
                }
            }
        }

        if (canMoveTo) {
            hoverStyle.backgroundImage = `url(${hoverToImage})`;
        }
    }

    return (<div key={`hover-${props.position.toString()}`} className={classes.hover} style={hoverStyle}>
    </div>);
};

Hover.propTypes = chessProps

export default Hover;

import React, {PropTypes} from 'react';
import classes from './chess.scss';
import _ from 'lodash';
import chessProps from './chessProps';

import black1 from './images/black1.svg';
import black2 from './images/black2.svg';
import black3 from './images/black3.svg';
import black4 from './images/black4.svg';
import black5 from './images/black5.svg';
import black6 from './images/black6.svg';
import black7 from './images/black7.svg';
import black8 from './images/black8.svg';

const blackInfluence = [black1, black2, black3, black4, black5, black6, black7, black8];

import white1 from './images/white1.svg';
import white2 from './images/white2.svg';
import white3 from './images/white3.svg';
import white4 from './images/white4.svg';
import white5 from './images/white5.svg';
import white6 from './images/white6.svg';
import white7 from './images/white7.svg';
import white8 from './images/white8.svg';

const whiteInfluence = [white1, white2, white3, white4, white5, white6, white7, white8];

const GRADIENTS = 4;
const GRADIENTS_DENOM = 6;

export const Influence = (props) => {
    const style = {};
    const position = props.position.toString();
    var tileInfluence = props.influence[0].index[position];
    let color = null;
    if (tileInfluence.netInfluence) {
        var opacity = Math.abs(Math.min(4, Math.max(-GRADIENTS, tileInfluence.netInfluence)) / GRADIENTS_DENOM);
        if (tileInfluence.netInfluence > 0) {
            color = `rgba(255, 162,0,${opacity})`;
        } else {
            color = `rgba(63, 59, 154, ${opacity})`;
        }
        style.backgroundColor = color;
    }

    const blackStyle = {};
    let image;
    if (tileInfluence.blackInfluence) {
         image = blackInfluence[tileInfluence.blackInfluence - 1] || _.last(blackInfluence);
        blackStyle.backgroundImage = `url(${image})`;
    }
    const whiteStyle = {};
    if (tileInfluence.whiteInfluence) {
        image = whiteInfluence[tileInfluence.whiteInfluence - 1] || _.last(whiteInfluence);
        whiteStyle.backgroundImage = `url(${image})`;
    }

    return (<div key={`influence${props.position.toString()}`} className={classes.influence} style={style}>
        <div key={`influence${props.position.toString()}-black`}
             className={`${classes.influence__inner} ${classes.influence__black}`}
             style={blackStyle}>&nbsp;
        </div>
        <div key={`influence${props.position.toString()}-white`}
             className={`${classes.influence__inner} ${classes.influence__white}`}
             style={whiteStyle}>&nbsp;
        </div>
    </div>);
};

Influence.propTypes = chessProps;

export default Influence;

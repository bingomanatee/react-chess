import React from 'react';
import {Link} from 'react-router';
import classes from './HomeView.scss';

export const HomeView = () => (
    <div>
        <h4>Welcoome to Augmented Chess!</h4>
        <p>This is an experiment in visualizing areas of influence on a chess board. Click on a piece to start moving,
            click on a highlit cell to move it. a
        </p>
        <p>This is still very rough so a few things are missing; no en pessant, no take-backs and no castling.</p>
        <p>Also, the rules around check are not in place - you can freely move while in check and taking the king
            doesn't end the game yet. </p>

        <p>This is entirely clientside using React and Flux. Enjoy!
        </p>
        <p><Link to="/chess" activeClassName={classes.activeRoute}>
            Let's play augmentedd Augmented Chess
        </Link></p>
    </div>
);

export default HomeView;

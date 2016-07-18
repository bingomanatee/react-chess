import React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';

export const Header = () => (
  <div>
    <h1 className={classes.title}>React Redux Starter Kit</h1>
    <Link to="/react-chess" activeClassName={classes.activeRoute}>
      Home
    </Link>
    {' · '}
    <Link to="chess" activeClassName={classes.activeRoute}>
      Augmented Chess
    </Link>
  </div>
);

export default Header;

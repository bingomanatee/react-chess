import { connect } from 'react-redux';
import { hover, moveStart , moveComplete , moveCancel } from '../modules/chess';

/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the chess:   */

import Chess from 'components/Chess';

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
    hover, moveStart, moveComplete, moveCancel
};

const mapStateToProps = (state) => state.chess;

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 import { createSelector } from 'reselect'
 const chess = (state) => state.chess
 const tripleCount = createSelector(chess, (count) => count * 3)
 const mapStateToProps = (state) => ({
 chess: tripleCount(state)
 })

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(Chess);

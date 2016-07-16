import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'chess',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Chess = require('./containers/ChessContainer').default;
      const reducer = require('./modules/chess').default;

      /*  Add the reducer to the store on key 'chess'  */
      injectReducer(store, { key: 'chess', reducer });

      /*  Return getComponent   */
      cb(null, Chess);

    /* Webpack named bundle   */
    }, 'chess');
  }
});

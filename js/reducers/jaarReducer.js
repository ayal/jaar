/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */

import { ALBUMS_LOAD, ALBUMS_LOAD_OK } from '../constants/AppConstants';
const assign = Object.assign || require('object.assign'); // Polyfill maybe needed for browser support

const initialState = {
    albums:[],
    ready:false
};

function jaarReducer(state = initialState, action) {
    console.log('jaar reducer', action.type);
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case ALBUMS_LOAD:
      return {
	      ...state,
	  ready:false
      };
    case ALBUMS_LOAD_OK:
      return {
	      ...state,
	  albums: action.albums,
	  ready:true
      };

    default:
      return state;
  }
}

export default jaarReducer;

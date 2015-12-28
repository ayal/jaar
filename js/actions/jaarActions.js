/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return (dispatch) => {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        };
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */

import { ALBUMS_LOAD, ALBUMS_LOAD_OK } from '../constants/AppConstants';
import fetchp from 'fetch-jsonp'

export function asyncFetchAlbums(term) {
    return (dispatch) => {
	dispatch(fetchingAlbums());
	console.log('fetching', term);
	return fetchp("//itunes.apple.com/search?term=" + encodeURIComponent(term || 'jaar') + "&limit=25&media=music&entity=album").then(
	    albums => albums.json().then((data) => dispatch(fetchAlbums(data))),
	    error => console.log('fetch error')
	);
  };
}

function fetchingAlbums() {
  return {
    type: ALBUMS_LOAD
  };
}


function fetchAlbums(albums) {
  return {
    type: ALBUMS_LOAD_OK,
    albums
  };
}


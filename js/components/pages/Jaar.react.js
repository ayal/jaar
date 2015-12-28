/*
 * Jaar
 * This is the first component i write
 */

import { asyncFetchAlbums } from '../../actions/jaarActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Jaar extends Component {
    constructor(props, context) {
	super(props, context)
	this.state = {
	    text: this.props.location.query.term || ''
	}
    }
    
    refetch(props) {
	var props = props || this.props;
	const {location: {query: {term}}} = props;
	this.props.dispatch(asyncFetchAlbums(term));
    }
    
    componentDidMount(){
	this.refetch.bind(this)();
    }

    componentWillUpdate(nprops){
	console.log('Jaar component updated', nprops.location.query, this.props.location.query)
	if (nprops.location.query !== this.props.location.query) {
	    this.refetch.bind(this)(nprops);
	}
    }

    search(e) {
	if (e.key === 'Enter') {
	    this.setState({text:this.refs.input.value});
	    this.props.history.pushState(null, location.pathname, {term: this.refs.input.value});
	}
    }

    change(e) {
	this.setState({text:this.refs.input.value});
    }
    
    render() {
	console.log('rendering Jaar component', this.props.data);
	const { data: {jaarReducer: {albums: {results}}} } = this.props;
	
	const dispatch = this.props.dispatch;
	if (!results) {
	    return <div>'loading...'</div>
	}
	var squares = results.map((r) => {
	    return (<div className="album">
		    <img src={r.artworkUrl100} />
		    <div className="text">
		    {r.collectionName}
		    </div>
		    </div>)
	}
	)
	return (
		<div className="container">
		<div>
		<input value={this.state.text} ref='input' onKeyPress={this.search.bind(this)} onChange={this.change.bind(this)} />
		</div>
		<div className="albums">
		{results ? squares : 'loading..'}
	    </div>
		</div>
	);
    }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
    return {
	data: state
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Jaar);

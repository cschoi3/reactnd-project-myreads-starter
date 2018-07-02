import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {

	state = {
		value: this.props.shelf
	}

	handleChange = (event) => {
		
		const {book, changeShelf} = this.props;
		const val = event.target.value;
		changeShelf(book, event.target.value)
		
		this.setState((prevState) => ({
			value: val
		}))
	}

	render() {
		
		return (<div className="book-shelf-changer">
			<select value={this.state.value} onChange={this.handleChange}>
				<option value="move" disabled>Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			</select>
		</div>);
	}
}

export default BookShelfChanger;
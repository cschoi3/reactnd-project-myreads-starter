import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'; 
import Book from './book';
import PropTypes from 'prop-types';

class SearchPage extends Component {

	state = {
		query: '',
		books: []
	}

	handleChange = (query) => {

		BooksAPI.search(query)
			.then((results) => {
				this.updateBooks(results);
			})

		this.setState((prevState) => ({
			query
		}))
	}

	updateBooks = (books) => {
		books = books ? books : [];
		// console.log('yup', books)
		this.setState((prevState) => ({
			books
		}))
	}

	render() {
		const {books, query} = this.state;
		const { changeShelf } = this.props;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.handleChange(event.target.value)}/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.length > 0 ? books.map((book) => {
							return (
								<li key={book.id}>
									<Book
										book={book}
										changeShelf={changeShelf}
									/>
								</li>
								)
							}) : (<li></li>)
						}
					</ol>
				</div>
			</div>)
	}
}

export default SearchPage;
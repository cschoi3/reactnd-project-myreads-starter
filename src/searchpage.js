import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'; 
import Book from './book';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

class SearchPage extends Component {

	state = {
		query: '',
		books: [],
		booksOnShelves: []
	};

	componentDidMount () {

		//get all books from API, sets to booksOnShelves on this.state
		BooksAPI.getAll()
			.then((booksOnShelves) => {
				this.setState(() => ({
					booksOnShelves
				}))
		}) 
	}


	/**
	handles the query string on the search input element,
	calls search function on BooksAPI and returns a collection
	of books matching search query
	*/
	handleChange = (query) => {

		this.search(query);

		this.setState((prevState) => ({
			query
		}))
	};

	/**
	search call to BooksAPI
	*/
	search = debounce((query) => {
		BooksAPI.search(query)
			.then((results) => {
				this.updateBooks(results);
			})
			.catch((results) => {
				this.updateBooks([]);
			})
	}, 250);


	/**
	updates the this.state.books collection with results
	from BooksAPI.search
	*/
	updateBooks = (books) => {
		
		const { booksOnShelves } = this.state;

		books = mapBooksOnShelvesToBooks(booksOnShelves, books);

		this.setState((prevState) => ({
			books
		}))
	};


	render() {
		const {books, query} = this.state;
		const { changeShelf } = this.props;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text"
							placeholder="Search by title or author"
							value={query}
							onChange={(event) => this.handleChange(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{
							books.length > 0 ? books.map((book) => {
								return (
									<li key={book.id}>
										<Book
											book={book}
											changeShelf={changeShelf}
											shelf={book.shelf}
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

/**
mapBooksOnShelvesToBooks reconciles the results from BooksAPI.search
with the books (and their shelf properties) on the main page/from BooksAPI.getAll
*/
const mapBooksOnShelvesToBooks = function mapBooksOnShelvesToBooks (booksOnShelves, books) {
	return books.map((book)=>{
		booksOnShelves.forEach((bk) => {
			if(bk.id === book.id) {
				book.shelf = bk.shelf;
			} else if (!book.hasOwnProperty('shelf')) {
				book.shelf = 'none'
			}
		})
		return book;
	})
}

SearchPage.propTypes = {
	changeShelf: PropTypes.func.isRequired
};

export default SearchPage;
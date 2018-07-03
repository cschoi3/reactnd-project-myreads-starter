import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './bookshelf';
import SearchPage from './searchpage';

class BooksApp extends React.Component {

	state = {
		books: []
	};

	componentDidMount () {
		
		//get all books from API, sets to books on this.state
		BooksAPI.getAll()
			.then((books) => {
				this.setState(() => ({
					books
				}))
		}) 
	}

	/*
	used to filter the books array from api by shelf,
	takes a collection of books (array of objects), filters by shelf name (string),
	given: filterby(
		[{title: 'hello', shelf:'read'}, {title: 'goodbye', shelf: wantToRead}], 
		'read')
	expect: [{title: 'hello', shelf: 'read'}]		
	*/ 
	filterBy = (arr, by) => {
		return arr.filter((ele) => {
			return ele.shelf === by;
		})
	};

	/*
	function to change books location and update book on API
	takes a book (object), and shelf name (string),
	given: changeShelf(
		{title: 'hello', shelf: 'read'}, 
		'wantToRead')
	expect: updated this.state.books with given book's shelf
		changed to given shelf string
	*/
	changeShelf = (book, changeShelfTo) => {
		const { books } = this.state;
		const { id } = book;

		//prep book's shelf value change
		book.shelf = changeShelfTo;

		//call to update book on API with (above) prepped book
		BooksAPI.update(book, changeShelfTo)
			.then(() => {})

		/*
		if conditional to account for states where
		book does or does not exist on the this.state.books collection,
		if it doesn't concat book into the collection,
		else update the book in the collection
		*/
		if(!checkBookExists(books, id)){
			this.setState((prevState) => ({
				books: [...prevState.books, book]
			}))
		} else {
			const booksUpdated = changeBooksCategory(books, changeShelfTo, id);
			this.setState((prevState) => ({
				books: booksUpdated
			}))
		}
	};


	render() {
		const { books } = this.state;

		return (
			<div className="app">
				<Route path='/search' render={() => (<SearchPage books={this.state.books} changeShelf={this.changeShelf}/>)}/>
				<Route exact path='/' render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								<BookShelf bookshelfTitle='Currently Reading' books={this.filterBy(books, 'currentlyReading')} changeShelf={this.changeShelf}/>
								<BookShelf bookshelfTitle='Want to Read' books={this.filterBy(books, 'wantToRead')} changeShelf={this.changeShelf}/>
								<BookShelf bookshelfTitle='Read' books={this.filterBy(books, 'read')} changeShelf={this.changeShelf}/>
							</div>
						</div>
						<div className="open-search">
							<Link to='/search'>Add a book</Link>
						</div>
					</div>
				)}/>
			</div>
		)
	}
}

//checks for if book does or does not exist on the this.state.books collection
const checkBookExists = function checkBookExists (books, bookId) {
	return books.some((book) => {
		return book.id === bookId;
	})
};

//given the book exists in the current collection (books), change books shelf location
const changeBooksCategory = function changeBooksCategory (books, changeShelfTo, bookId) {
	return books.map((book) => {
		if(book.id === bookId) {
			book.shelf = changeShelfTo;
		}
		return book;
	})
};



export default BooksApp

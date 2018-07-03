import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './bookshelf';
import SearchPage from './searchpage';

class BooksApp extends React.Component {

	state = {
		books: []
	}

	componentDidMount () {
		BooksAPI.getAll()
			.then((books) => {
					// console.log('hello?', books)
				this.setState(() => ({
					books
				}))
		}) 
	}

	//used to filter the books array from api by shelf
	filterBy = (arr, by) => {
		return arr.filter((ele) => {
			return ele.shelf === by;
		})
	}

	changeShelf = (book, changeShelfTo) => {
		const { books } = this.state;
		const { id } = book;
		
		book.shelf = changeShelfTo;

		BooksAPI.update(book, changeShelfTo)
			.then(() => {})

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
	}


	render() {
		const { books } = this.state;

		return (
			<div className="app">
				<Route path='/search' render={() => (<SearchPage addBook={this.addBook} changeShelf={this.changeShelf}/>)}/>
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

var checkBookExists = function checkBookExists (books, bookId) {
	return books.some((book) => {
		return book.id === bookId;
	})
}

var changeBooksCategory = function changeBooksCategory (books, changeShelfTo, bookId) {
	return books.map((book) => {
		if(book.id === bookId) {
			book.shelf = changeShelfTo;
		}
		return book;
	})
}



export default BooksApp

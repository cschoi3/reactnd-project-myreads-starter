import React from 'react';
import { Route } from 'react-router-dom';
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
		const booksUpdated = changeBooksCategory(books, changeShelfTo, id);

		BooksAPI.update(book, changeShelfTo)
			.then(() => {})

		this.setState((prevState) => ({
			books: booksUpdated
		}))
	}


	render() {
		const { books } = this.state;

		return (
			<div className="app">
				<Route path='/search' render={() => (<SearchPage/>)}/>
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
							<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
						</div>
					</div>
				)}/>
			</div>
		)
	}
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

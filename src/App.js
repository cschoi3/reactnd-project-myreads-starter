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
					console.log('hello?', books)
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
								<BookShelf bookshelfTitle='Currently Reading' books={this.filterBy(books, 'currentlyReading')}/>
								<BookShelf bookshelfTitle='Want to Read' books={this.filterBy(books, 'wantToRead')}/>
								<BookShelf bookshelfTitle='Read' books={this.filterBy(books, 'read')}/>
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

export default BooksApp

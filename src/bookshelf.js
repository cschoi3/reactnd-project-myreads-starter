import React from 'react';
import PropTypes from 'prop-types';
import Book from './book';

const BookShelf = ({ bookshelfTitle, books, changeShelf }) => {

	// console.log('books and title', bookshelfTitle, books )
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{bookshelfTitle}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{
						books.length > 0 ? books.map((book) => {
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
		</div>);
}

BookShelf.propTypes = {
	bookshelfTitle: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	changeShelf: PropTypes.func.isRequired
};

export default BookShelf;
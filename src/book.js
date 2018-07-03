import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './bookshelfchanger';

const Book = ({ book, changeShelf }) => {
  // console.log('what is going on here', book)
	const { imageLinks, authors, title, id, shelf } = book;

	const image = imageLinks ? `url(${imageLinks.thumbnail})` : '';
	// console.log('why', title)
	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: image}}></div>
					<BookShelfChanger
						book={book}
						changeShelf={changeShelf}
						shelf={shelf}
					/>
			</div>
			<div className="book-title">{title}</div>
			<div className="book-authors">
				{
					authors ? authors.map((author) => {
						return (
							<div key={`${author}${id}`}>
								{author}
							</div>)
					}) : <div></div>
				}
			</div>
		</div>)
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	changeShelf: PropTypes.func.isRequired
};

export default Book;
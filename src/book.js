import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './bookshelfchanger';

const Book = ({ book, changeShelf }) => {

	const { imageLinks, authors, title, id, shelf } = book;
	// console.log('why', title)
	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
					<BookShelfChanger
						book={book}
						changeShelf={changeShelf}
						shelf={shelf}
					/>
			</div>
			<div className="book-title">{title}</div>
			<div className="book-authors">
				{authors ? 
					authors.map((author) => (
						<div key={`${author}${id}`}>{author}</div>
					)) : <div></div>
				}
			</div>
		</div>)
}

export default Book;
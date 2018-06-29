import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './bookshelfchanger';

const Book = (props) => {
	const { backgroundImage, authors, title } = props;

	console.log('why', props.title)
	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImage})` }}></div>
					<BookShelfChanger/>
			</div>
			<div className="book-title">{title}</div>
			<div className="book-authors">
				{authors ? 
					authors.map((author) => (
						<div>{author}</div>
					)) : <div></div>
				}
			</div>
		</div>)
}

export default Book;
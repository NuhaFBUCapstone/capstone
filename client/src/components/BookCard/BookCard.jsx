import "./BookCard.css"
import * as React from "react"
import {Link} from "react-router-dom" 

export default function BookCard(props) {
    return (
    <div className="book-card">
        <h2 className="book-name">
            {props.book.title}
        </h2>
        <p className="subtitle"> {props.book.subtitle} </p>
        <div className="media">
            <Link to={`/book/${props.bookId}`}>
                {props.imageArr ?  <img src={props.imageArr}></img> : 
            <div className="no-image"><p className="no-img">No Image Available</p></div>}
            </Link>
        </div>
        <div className="info">
            <div className={props.book.authors ? "author" : "hidden"}>Authors: {props.book?.authors?.join(', ')}</div>
        </div>

    </div>
    )

}
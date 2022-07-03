import "./BookCard.css"
import * as React from "react"
import axios from "axios"
import { useState } from "react"
import {Link} from "react-router-dom" 

export default function BookCard(props) {
    return (
    <div className="book-card">
        <h2 className="book-name">
            {props.book?.title}
        </h2>
        <p className="subtitle"> {props.book?.subtitle} </p>
        <div className="media">
            {props.imageArr ?  <img src={props.imageArr}></img> : 
            <div className="no-image"><p className="no-img">No Image Available</p></div>}
            {/* <Link to={"/book" + props.book.id}><img src={props.imageArr.thumbnail}></img></Link> */}
        </div>
        <div className="info">
            <div className="author">Authors: {props.book?.authors}</div>
            {/*rating, add to library, author */}
        </div>

    </div>
    )

}
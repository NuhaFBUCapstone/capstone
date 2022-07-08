import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Link} from "react-router-dom"
import "./Library.css"
import BookCard from "../BookCard/BookCard"


export default function Library({sessionToken}) {
    let results = [1, 2, 3, 4, 5, 6, 7]
    return (
        <div className="search-page">
            {sessionToken==="" ? <div>Must be logged in to view this page.
                <br></br><Link to="/">login here</Link></div>:
        <><div className="side">
                    <p id="header">Lists:</p>
                    <p id="list">to-read</p>
                    <p id="list">favorites</p>
                    <p id="list">did-not-finish</p>
                    <p id="list">romance</p>
                </div>
            <div className="grid">
                    {results.map((b, idx) => {
                        return <BookCard key={idx} results={results} book={b} imageArr={b?.img} />
                    })}
            </div></> }
        </div>
    )
}
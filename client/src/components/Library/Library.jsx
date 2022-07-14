import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Link} from "react-router-dom"
import "./Library.css"
import { useState, useEffect } from "react"
import BookCard from "../BookCard/BookCard"
import axios from "axios"

export default function Library({sessionToken}) {
    const [books, setBooks] = useState({})
    const [list, setList] = useState("")
    console.log(list)

    async function getLists() {
        try {
            const response = await axios.get(`http://localhost:3001/library/${sessionToken}`)
            console.log("Library getlists()")
            console.log(response.data)
            setBooks(response.data)
            // let temp = {}
            // lists.map(l => {
            //     return temp[l] = []
            // })
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (sessionToken!=="") getLists()
      },[])


    async function getBooks() {
        try {
            const response = await axios.get(`http://localhost:3001/library/books/${list}`, {
                "sessionToken": sessionToken
            })
        } catch (err) {
            console.log(err)
        }
    }
    // books={
    //     "Read": [], 
    //      "Hi": [bookId, bookId, etc to get from google API]
    // }
    return (
        <div className="library">
            <div className={sessionToken==="" ? "logged-out" : "hidden"}>
                <div>Must be logged in to view this page.
                <br></br>
                <Link to="/">login here</Link></div>
            </div> 
            <div className={sessionToken==="" ? "hidden" : "flex"}>  
                <div className="library-side">
                    <p id="header">Lists:</p>
                    {Object.keys(books).map(l => {
                        return <p onClick={() => setList(l)} id="list">{l}</p>
                    })}
                    <p id="list-add">add list...</p>
                </div>
                <div className="library-grid">
                    <div className="grid-title">{list}</div>
                    {books[list]?.map(b => {
                        return <Link to={`/book/${b.bookId}`}><div>{`${b.title} by ${b.author}`} <img className="lib-img" src={b.image}/></div></Link>
                    })}
                    {/* {books.map((b, idx) => {
                        return <BookCard key={idx+100} results={results} book={b} imageArr={b?.img} />
                    })} */}
                </div>
            </div>
        </div>
    )
}
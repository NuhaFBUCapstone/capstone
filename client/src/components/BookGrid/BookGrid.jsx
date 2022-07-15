import "./BookGrid.css"
import * as React from "react"
import BookCard from "../BookCard/BookCard"
import axios from "axios"
import { useState } from "react"


export default function BookGrid() {
    const [search, setSearch] = useState ("")
    const [results, setResults] = useState([])

    async function getSearch(search) {
        if (!search) return;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=35&langRestrict=en`)
        setResults(response.data.items)
    }

    return (
        <div className="search-page">
        <div className="side">
            <form className="search-bar">
                <input type="text" onChange={(e) => {
                    setSearch(e.target.value)
                }} className="bar" placeholder="Type Here" /> 
                <input id="search-btn" type="submit" value="search" onClick={(e) => {e.preventDefault(); getSearch(search)}}/>            
            </form>
            </div>
            <div className="grid">
                {results.map(b => {
                    return <BookCard key={b.id} book={b.volumeInfo} bookId={b.id} imageArr={b.volumeInfo.imageLinks?.thumbnail}/>
                })}
            </div>
        </div>
    )
}
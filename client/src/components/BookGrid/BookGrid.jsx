import "./BookGrid.css"
import * as React from "react"
import BookCard from "../BookCard/BookCard"
import axios from "axios"
import { useState } from "react"


export default function BookGrid() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    async function getSearch(search) {
        if (!search) return;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=30&langRestrict=en`)
        setResults(response.data.items)
    }



    return (
        //<button onClick={(search) => getSearch(search)}>here</button>
        <div className="search-page">
        <div className="side">
            <form className="search-bar">
                <input type="text" onChange={(e) => {
                    setSearch(e.target.value)
                }} className="bar" placeholder="Type Here" />             
            </form>
            <button type="submit" onClick={(e) => {e.preventDefault(); getSearch(search)}}>search</button>
            </div>
            <div className="grid">
                {results.map((b, idx) => {
                    return <BookCard key={b.id} book={b.volumeInfo} bookId={b.id} imageArr={b.volumeInfo.imageLinks?.thumbnail}/>
                })}
            </div>
        </div>
    )
}
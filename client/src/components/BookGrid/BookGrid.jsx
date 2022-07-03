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
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=25`)
        setResults(response.data.items)
        console.log(results)
    }



    return (
        //<button onClick={(search) => getSearch(search)}>here</button>
        <div className="search">
            <form>
                <input onChange={(e) => {
                    setSearch(e.target.value)
                }} className="bar" placeholder="Type Here" />             
            </form>
            <button onClick={() => getSearch(search)}>search</button>
            <div className="grid">
                {results.map((b, idx) => {
                    return <BookCard key={idx} results={results} book={b.volumeInfo} imageArr={b.volumeInfo.imageLinks?.thumbnail}/>
                })}
            </div>
        </div>
    )
}
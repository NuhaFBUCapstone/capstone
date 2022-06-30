import "./BookGrid.css"
import * as React from "react"
import BookCard from "../BookCard/BookCard"
import axios from "axios"
import { useState } from "react"


export default function BookGrid() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState({})
    console.log()

    async function getSearch(search) {
        console.log(search)
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20`)
        console.log(response.data)
        //setResults(response)
    }



    return (
        //<button onClick={(search) => getSearch(search)}>here</button>
        <div className="grid">
            <h1> Book Search </h1>
            <form>
                <input onChange={(e) => {
                    setSearch(e.target.value)
                }} className="bar" placeholder="Type Here" />             
            </form>

            <button onClick={() => getSearch(search)}>here</button>
            <div className="results">
                <BookCard results={results}/>
            </div>
        </div>
    )
}
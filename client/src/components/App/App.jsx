import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import BookGrid from "../BookGrid/BookGrid"
import NavBar from "../NavBar/NavBar"
import Home from "../Home/Home"
import BookDetail from "../BookDetail/BookDetail"
import Library from "../Library/Library"
import Playlist from "../Playlist/Playlist"
import axios from "axios"


export default function App() {
    const [trends, setTrends] = useState([])
    const [fetching, setFetching] = useState(false)

    async function getTrending() {
        setFetching(true)
        try {
            const response = await axios.get(`https://openlibrary.org/trending/daily.json`)
            setTrends(response.data.works.slice(0, 7))
        } catch (err) {
            console.log(err)
        }
        setFetching(false)
    }
 
    useEffect(() => {
        getTrending()
      },[])
    return (
        <div className="app">
            <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home fetching={fetching} trends={trends}/>}/>
                <Route path="/search" element={<BookGrid/>}/>
                <Route path="/book/:id" element={<BookDetail/>}/>
                <Route path="/library" element={<Library/>}/>
                <Route path="/playlist" element={<Playlist/>}/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}
import * as React from "react"
import axios from "axios"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import BookGrid from "../BookGrid/BookGrid"
import NavBar from "../NavBar/NavBar"
import BookDetail from "../BookDetail/BookDetail"
import Library from "../Library/Library"
import Playlist from "../Playlist/Playlist"
import LoggedOut from "../LoggedOut/LoggedOut"
import Home from "../Home/Home"

export default function App() {
    const [sessionToken, setSessionToken] = useState("")

    const [trends, setTrends] = useState([])
    const [fetching, setFetching] = useState(false)

    async function stupidToken() {
        console.log(sessionToken)
        try {
            const response = await axios.post(`http://localhost:3001/books/add/27`, 
            {"sessionToken": sessionToken, "list": "currently reading"})
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

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
            <NavBar sessionToken={sessionToken} setSessionToken={setSessionToken}/>
            <button onClick={stupidToken}>idhwdh</button>
            <Routes>
                {/* <Route path="/" element={(sessionToken!=="") ? <Home/> : <LoggedOut setSessionToken={setSessionToken} 
                sessionToken={sessionToken}/>}/> */}
                <Route path="/" element={<LoggedOut trends={trends} fetching={fetching} 
                sessionToken={sessionToken} setSessionToken={setSessionToken}/>}/>
                <Route path="/home" element={<Home sessionToken={sessionToken}/>}/>
                <Route path="/search" element={<BookGrid/>}/>
                <Route path="/book/:id" element={<BookDetail/>}/>
                <Route path="/library" element={<Library sessionToken={sessionToken} />}/>
                <Route path="/playlist" element={<Playlist/>}/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}
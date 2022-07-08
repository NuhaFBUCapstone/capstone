import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import BookGrid from "../BookGrid/BookGrid"
import NavBar from "../NavBar/NavBar"
import Home from "../LoggedOut/LoggedOut"
import BookDetail from "../BookDetail/BookDetail"
import Library from "../Library/Library"
import Playlist from "../Playlist/Playlist"
import axios from "axios"


export default function App() {
    const [trends, setTrends] = useState([])
    const [fetching, setFetching] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("current_user_id") !== null)

    async function getTrending() {
        //might move to Home.jsx since it's not used anywhere else (maybe use in Spotify recommended search)
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

    
  const handleLogout = () => {
    localStorage.removeItem("current_user_id")
    axios.defaults.headers.common = {};
    setIsLoggedIn(false)
  }

  const handleLogin = (user) => {
    console.log(user)
    localStorage.setItem("current_user_id", user["objectId"])
    addAuthenticationHeader()

    setIsLoggedIn(true)
  }

    return (
        <div className="app">
            <BrowserRouter>
            <NavBar/>
            <Routes>
                {/* in logged out view, navbar clicks to mylibrary give popup message */}
                <Route path="/" element={<LoggedOut fetching={fetching} trends={trends} 
                handleLogin={handleLogin}/>}/>
                <Route path="/search" element={<BookGrid/>}/>
                <Route path="/book/:id" element={<BookDetail/>}/>
                <Route path="/library" element={<Library/>}/>
                <Route path="/playlist" element={<Playlist/>}/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}
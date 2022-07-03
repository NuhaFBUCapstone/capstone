import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from "react"
import BookGrid from "../BookGrid/BookGrid"
import NavBar from "../NavBar/NavBar"
import Home from "../Home/Home"
import BookDetail from "../BookDetail/BookDetail"
import Library from "../Library/Library"

export default function App() {
    return (
        <div className="app">
            <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<BookGrid/>}/>
                <Route path="/book/:id" element={<BookDetail/>}/>
                <Route path="/library" element={<Library/>}/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}
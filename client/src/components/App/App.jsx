import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from "react"
import BookGrid from "../BookGrid/BookGrid"

export default function App() {
    console.log("HI")

    return (
        <div className="app">
            <BookGrid/>
        </div>
    )
}
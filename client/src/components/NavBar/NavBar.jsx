import * as React from "react"
import {Link} from "react-router-dom"
import "./NavBar.css"

export default function NavBar() {
    return (
    <nav className="navbar">
      <Link to="/"><p id="nav-button">Home</p></Link>
      <Link to="/search"><p id="nav-button">Search</p></Link>
      <a id="nav-button" href="#buy-now">My Library</a>
      <a id="nav-button" href="#about-us">Playlist Gen</a> |
    </nav>
    )
}
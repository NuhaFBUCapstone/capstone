import * as React from "react"
import {Link} from "react-router-dom"
import "./NavBar.css"

export default function NavBar() {
    return (
    <nav className="navbar">
      <Link to="/"><p id="nav-button">Home</p></Link>
      <Link to="/search"><p id="nav-button">Search</p></Link>
      <Link to="/library"><p id="nav-button">My Library</p></Link>
      <Link to="/playlist"><p id="nav-button">Playlist Gen</p></Link>
    </nav>
    )
}
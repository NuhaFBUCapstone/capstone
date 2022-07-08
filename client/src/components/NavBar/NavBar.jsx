import * as React from "react"
import {Link} from "react-router-dom"
import "./NavBar.css"
import axios from "axios"

export default function NavBar({setSessionToken, sessionToken}) {

  const logout = async (event) => {
    event.preventDefault()
    const res = await axios.post(`http://localhost:3001/logout`, {
      "sessionToken" : sessionToken
      })
    setSessionToken("")
    console.log(sessionToken)
  }
    return (
    <nav className="navbar">
      <Link to="/"><img id="nav-pic" src="https://medicalpartnership.usg.edu/wp-content/uploads/2021/08/Facebook-logo.png"/></Link>
      <Link to="/home"><p id="nav-button">Home</p></Link>
      <Link to="/search"><p id="nav-button">Search</p></Link>
      <Link to="/library"><p id="nav-button">My Library</p></Link>
      <Link to="/playlist"><p id="nav-button">Playlist Gen</p></Link>
      <p onClick={logout} id="nav-button">Logout</p>
    </nav>
    )
}
import * as React from "react"
import "./Home.css"
import {Link} from "react-router-dom"

export default function Home({sessionToken}) {
    console.log("token: " + sessionToken)
    return (
        <div className="home">
            {sessionToken==="" ? "must be logged in to view this page." : "logged in!!!"}<br/>
            {/* {sessionToken==="" ? "" : `Welcome, ${user.user.username}`}<br/> */}
            {sessionToken==="" ? <Link to="/">click to login</Link> : ""}<br/>
            [this page will have friend activity, recomendations (stretch), and recent activity]
        </div>
    )
}
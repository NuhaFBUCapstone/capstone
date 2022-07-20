import * as React from "react"
import "./Home.css"
import {Link} from "react-router-dom"

export default function Home({sessionToken}) {
    return (
        <div className="home">
            <div className={sessionToken===null ? "logged-out-home" : "hidden"}>
                <p>Must login to view this page</p>
                <Link to="/">Click to login</Link>
            </div>
            <div className={sessionToken===null ? "hidden" : "logged-in-home"}>
                logged in !!! <br/> 
                [this page will have friend activity, recomendations (stretch), and recent activity]
            </div>            
        </div>
    )
}
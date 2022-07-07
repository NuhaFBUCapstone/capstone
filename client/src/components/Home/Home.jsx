import * as React from "react"
import "./Home.css"
import axios from "axios"
import { useState, useEffect } from "react"
import BookCard from "../BookCard/BookCard"

export default function Home(props) {
    return (
        <div className="home">
            <div className="header">
                "Meet your next favorite book."
            </div>
            <h1>Today's Trending Books:</h1>
            {props.fetching ? <h3>Loading...</h3> :
            <div className="trend-box">
                {props.trends.map((b, idx) => {
                    return <div className="carousel" key={idx}>
                        <div className="text">{b.title}</div>
                        <img className="trends" src={`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`}/>
                    </div>
                })}
            </div> }
            <h2>About Us</h2>
            <div className="about-us">
                    <p className="about-text">
                        [blank] is a website designed to make reading a full experience. 
                        With personalized playlists for any book you're reading, you always have 
                        something to listen to that lets you fully engage with your next read.
                        </p>
                </div>
        </div>
    )
}
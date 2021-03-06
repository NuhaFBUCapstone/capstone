import * as React from "react"
import "./LoggedOut.css"
import axios from "axios"
import { useState, useEffect } from "react"
import LoginForm from "../LoginForm/LoginForm"
import ReactLoading from "react-loading"

export default function LoggedOut(props) {
    return (
        <div className="logged-out">
            <div className="header">
                <img src="https://images.gr-assets.com/hostedimages/1655747882ra/33078100.gif"/>
                {/* "Meet your next favorite book." */}
            </div>
            <div className="box1">
                {props.sessionToken===null ? 
                <div className="box">
                    <LoginForm setSessionToken={props.setSessionToken} sessionToken={props.sessionToken}/>
                </div> : ""}
            {/* <br></br> */}
                {/* {props.sessionToken==="" ?  <div className="box"><RegisterForm setSessionToken={props.setSessionToken}/></div> : ""} */}
            </div>
            <h1>Today's Trending Books:</h1>
            {props.fetching ? <h3>Loading...</h3> :
            <div className="trend-box">
                {props.trends?.map((b, idx) => {
                    return <div className="carousel" key={idx}>
                        <div className="text">{b.title}</div>
                        <img className="trends" src={`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`}/>
                    </div>
                })}
            </div> }
            <h2 className="about-us-header">About Us</h2>
            <div className="about-us">
                    <p className="about-text">
                        Readable is a website designed to make reading a full experience. 
                        With personalized playlists for any book you're reading, you always have 
                        something to listen to that lets you fully engage with your next read.
                        </p>
                </div>
        </div>
    )
}
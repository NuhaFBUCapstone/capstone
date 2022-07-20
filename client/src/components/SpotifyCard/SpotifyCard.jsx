import * as React from "react"
import "./SpotifyCard.css"
import { useState, useEffect } from "react"
import axios from "axios"

export default function SpotifyCard({song}) {
    return (
        <div className="sp-card">
            {/* get image from another api call to backend*/}
            {song.name} by {song.artists[0].name}
        </div>
    )
}
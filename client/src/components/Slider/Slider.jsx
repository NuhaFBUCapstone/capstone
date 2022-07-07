import * as React from "react"
import "./Slider.css"
import axios from "axios"
import { useState, useEffect } from "react"

export default function Slider(props) {
    const [slideIndex, setSlideIndex] = useState(1)
    const nextSlide = () => {
        if(slideIndex !== props.trends.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === props.trends.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(props.trends.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
             {props.trends.map((b, idx) => {
                    return (<div                     
                    className={slideIndex === idx + 1 ? "slide active-anim" : "slide"}
                    key={idx}>
                        <p>{b.title}</p>
                        <img className="trends" src={`https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`}/>
                    </div>)
                })}
            <button onClick={nextSlide}>Next</button>
            <button onClick={prevSlide}>Prev</button>

            <div className="container-dots">
                {Array.from({length: 5}).map((item, index) => (
                    <div key={index}
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )

}
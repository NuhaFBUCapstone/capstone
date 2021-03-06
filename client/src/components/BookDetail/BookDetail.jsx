import * as React from "react"
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import axios from "axios"

import "./BookDetail.css"

export default function BookDetail(props) {
    const params = useParams();
    const [book, setBook] = useState({})
    const [fetching, setFetching] = useState(false)
    const [opts, setOpts] = useState([])
    const [list, setList] = useState("")
    const [reviews, setReviews] = useState([])
    const [myReview, setMyReview] = useState("")
    const [myRating, setMyRating] = useState(0)

    
    /**
     * get dropdown options
     */
    async function getDropdown() {
        try {
            const response = await axios.get(`http://localhost:3001/library/${props.sessionToken}`)
            let test = Object.keys(response.data)
            let temp = []
            test.map((l, idx) => {
                temp.push(<option key={idx}>{l}</option>)
            })
            setOpts(temp)
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * get book details from google API
     */
    async function getDetails() {
        try {
            setFetching(true)
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${params.id}`)
            console.log(response.data)
            setBook(response.data)
            const reviewResponse = await axios.get(`http://localhost:3001/reviews/${response.data.id}`)
            setReviews(reviewResponse.data)
        } catch (err) {
            console.log(`error getting book details: ${err}`)
            setBook(undefined)
        }
        setFetching(false)
    }
    useEffect(() => {
        getDetails()
        {if (props.sessionToken!=="") getDropdown()}
    }, [])

    /**
     * add book to list and save details and image to database
     */
    async function addBook() {
        if (list==="") return
        try {
            const response = await axios.post(`http://localhost:3001/books/add/${book.id}`, {
                "sessionToken": props.sessionToken, "list": list, "title": book.volumeInfo?.title,
                "image": getImage(), "author": book.volumeInfo?.authors ? book.volumeInfo?.authors[0] : "[unknown]"
            })
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    async function addReview() {
        try {
            const response = await axios.post(`http://localhost:3001/reviews/add/${book.id}`, {
                "sessionToken": props.sessionToken, "review": myReview, "rating": myRating
            })
            setReviews(prev => [...prev, response.data])     
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * helper function to get image
     * @returns the largest image available
     */
    const getImage = () => {
        if (!book.volumeInfo) return
        const keys = Object.keys(book.volumeInfo?.imageLinks)
        return book.volumeInfo?.imageLinks[keys[keys.length-1]]
    }

    return (
        <div className="book-detail">
            {fetching ? <h1>Loading...</h1> : 
            (book===undefined) ? <div className="not-found">That book doesn't exist...</div> : 
            <div className="defined">
                <div className="test">
                    <img className="photo" src={getImage()}/>
                    <div className="details">Page Count: {book.volumeInfo?.printedPageCount}<br/>
                        Published Date: {book.volumeInfo?.publishedDate}<br/>
                        <a href={book.saleInfo?.buyLink} className={book.saleInfo?.saleability==="NOT_FOR_SALE" ? "hidden":"buy"}>
                            Click to Buy</a>
                    </div> 
                </div>
                <div className="title">"{book.volumeInfo?.title}" by {book.volumeInfo?.authors ? book.volumeInfo?.authors[0] : "[unknown]" }
                <br/></div>
                <div className="desc" dangerouslySetInnerHTML={{__html: book.volumeInfo?.description}}></div>
                <div className={props.sessionToken===null ? "hidden" : "dropdown-outer"}>
                    <label className="label">Add to List: </label>
                    <select className="dropdown" onChange={e => {setList(e.target.value)}}>
                        <option></option>
                        {opts}
                    </select>
                    <button onClick={addBook}>Add</button>
                </div><br/>
                <h2>Ratings and Reviews:</h2>
                <form className={props.sessionToken===null ? "hidden" : "review"}>
                    <label>Your Review: </label>
                    <input className="review-type" type="text" placeholder="Thoughts?" onChange={(e) => {
                    setMyReview(e.target.value)
                }}/>
                    <input className="rating-type" type="radio" value="1"/>
                    <input type="submit" value="Send" onClick={(e) => {e.preventDefault(); addReview()}}/>
                </form>
                <div className="ratings">{reviews.slice().reverse().map(r => {
                    return <div key={r.objectId}>
                        <p>{r.username}: {r.review} <br/> Rating: {r.rating}/5 <br/> Created at: {r.createdAt}</p>
                        </div>
                })}</div>
            </div>
    }
        </div>
    )
}
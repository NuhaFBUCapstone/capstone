import * as React from "react"
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import axios from "axios"

import "./BookDetail.css"

export default function BookDetail() {
    const [book, setBook] = useState({})
    console.log(book)
    //also need to get/post user specific data from backend (ratings and reviews and add to list)

    const params = useParams();
    async function getDetails() {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${params.id}`)
            if (response) setBook(response.data)
        } catch (err) {
            console.log(`error getting book details: ${err}`)
        }

    }
    useEffect(() => {
        getDetails()
    }, [])

    return (
        <div className="book-detail">
            Title: {book?.volumeInfo?.title}<br></br>
            Description: {book?.volumeInfo?.description}
        </div>
    )
}
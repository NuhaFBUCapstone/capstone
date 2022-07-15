import * as React from "react"
import {Link} from "react-router-dom"
import "./Library.css"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Library({sessionToken}) {
    const [books, setBooks] = useState({})
    const [list, setList] = useState("")
    const [adding, setAdding] = useState("")

    async function getLists() {
        try {
            const response = await axios.get(`http://localhost:3001/library/${sessionToken}`)
            console.log("Library getlists()")
            console.log(response.data)
            setBooks(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (sessionToken!=="") getLists()
      },[])


    // async function getBooks() {
    //     try {
    //         const response = await axios.get(`http://localhost:3001/library/books/${list}`, {
    //             "sessionToken": sessionToken
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    async function addList(e) {
        e.preventDefault();
        if (adding==="show") {
            setAdding("");
            return;
        }
        try {
            await axios.post(`http://localhost:3001/library/add/${adding}`, {
                "sessionToken": sessionToken
            })
            setBooks(prev => ({
                ...prev,
                ...books[adding] = []
            }))
            console.log(books)
        } catch (err) {
            console.log(err)
        }
        setAdding("")
    }

    async function deleteList(e) {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/library/delete/${list}`, {
                "sessionToken": sessionToken
            })
            let copy = {...books}
            delete copy[list]
            setBooks(books => ({
                ...copy
            }))        
        } catch (err) {
            console.log(err)
        }
    }


    // books={
    //     "Read": [], 
    //      "Hi": [bookId, bookId, etc to get from google API]
    // }
    return (
        <div className="library">
            <div className={sessionToken==="" ? "logged-out" : "hidden"}>
                <div>Must be logged in to view this page.
                <br></br>
                <Link to="/">login here</Link></div>
            </div> 
            <div className={sessionToken==="" ? "hidden" : "flex"}>  
                <div className="library-side">
                    <p id="header">Lists:</p>
                    {Object.keys(books).map(l => {
                        return <p onClick={() => setList(l)} id="list">{l}</p>
                    })}
                    {adding!=="" ? <form onSubmit={addList}>
                        <input className="list-add-type" type="text" onChange={(e) => setAdding(e.target.value)}/>
                        <input className="hidden" type="submit" value="Submit" />
                    </form> : <p onDoubleClick={() => setAdding("show")} id="list-add">add list...</p>}
                </div>
                <div>
                <div className="grid-title">{list} <br/> 
                    <button className={list!=="" ? "delete" : "hidden"} onClick={deleteList}>delete list</button>
                </div>
                <div className="library-grid">
                    {books[list]?.map(b => {
                        return <Link to={`/book/${b.bookId}`} key={b.bookId}><div>{`${b.title} by ${b.author}`} <img className="lib-img" src={b.image}/></div></Link>
                    })}
                </div></div>
            </div>
        </div>
    )
}
import * as React from "react"
import { useParams } from "react-router-dom"


export default function BookDetail() {
    const params = useParams();
    return (
        <div className="book-detail">
            {params.id}
        </div>
    )
}
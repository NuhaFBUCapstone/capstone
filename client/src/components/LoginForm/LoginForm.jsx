import * as React from "react"
import "./LoginForm.css"
import { createRef } from "react"
import axios from "axios"
import Home from "../Home/Home"
import {useNavigate } from "react-router-dom"

export default function LoginForm(props) {
    const navigate = useNavigate();
    const username = createRef();
    const password = createRef();

    const handleSubmit = event => {
        event.preventDefault();
        if (!(username.current.value && password.current.value)) return;
        const login = async () => {
            try {
                console.log("Logging in")
                const res = await axios.post(`http://localhost:3001/login`, {
                    "username" : username.current.value,
                    "password" : password.current.value
                    })
                props.setSessionToken(res.data.sessionToken)
                navigate("/home")
            } catch (err) {
                alert("Wrong username or password.")
                console.log(err)
            }
        }
        login()
    }
    return (
        <form onSubmit={handleSubmit}>
        <div className="title">Login</div>
        <label>
          <span>Username</span>
          <input ref={username}></input>
        </label>
        <label>
          <span>Password</span>
          <input type="password" ref={password}></input>
        </label>
        <button type="submit">Login</button>
      </form>
    )
}
import * as React from "react"
import "./LoginForm.css"
import { createRef } from "react"
import axios from "axios"
import Home from "../Home/Home"
import {useNavigate } from "react-router-dom"
import { useState } from "react"


export default function LoginForm(props) {
    const [log, setLog] = useState(true)
    const navigate = useNavigate();
    const username = createRef();
    const password = createRef();
    const passwordConf = createRef();

    // async function getLists(tok) {
    //     try {
    //         const response = await axios.get(`http://localhost:3001/library/${tok}`)
    //         props.setLists(response.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    
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

        const register = async () => {
            if (password.current.value!==passwordConf.current.value) {
                alert("Passwords do not match");
                return;
            }
            try {
                const res = await axios.post(`http://localhost:3001/register`, {
                    "username" : username.current.value,
                    "password" : password.current.value
                    })
                props.setSessionToken(res.data.sessionToken)
                navigate("/home")
            } catch (err) {
                alert(err.response.data)
                console.log(err)
            }
        }


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (!(username.current.value && password.current.value)) return;
            {log ? login() : register()}
        }}>
        <div className="title">{ log ? "Login" : "Register"}</div>
        <label>
          <span>Username:</span>
          <input className="input" ref={username}></input>
        </label>
        <br></br>
        <label>
          <span>Password: </span>
          <input className="input" type={"password"} ref={password}></input>
        </label>
        {log ? "" :  
        <><br></br><label>
          <span>Confirm Password:</span>
          <input className="input" type={"password"} ref={passwordConf}></input>
        </label></>
        }
        <br></br>
        <button type="submit">{log ? "Login" : "Register"}</button>
        <div>{log ? "Don't have an account?" : "Already have an account?"} <button onClick={() => {
            setLog(!log)
        }} className="link">Click here</button></div>
      </form>
    )
}
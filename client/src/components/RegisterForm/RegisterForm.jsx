import * as React from "react"
import "./RegisterForm.css"
import axios from "axios"
import {useNavigate } from "react-router-dom"
import {Link} from "react-router-dom"



export default function RegisterForm(props) {
    const navigate = useNavigate();
    const username = React.createRef();
    const password = React.createRef();

    const handleSubmit = event => {
        event.preventDefault();
        if (!(username.current.value && password.current.value)) return;

        const register = async () => {
            try {
                const res = await axios.post(`http://localhost:3001/register`, {
                    "username" : username.current.value,
                    "password" : password.current.value
                    })
                console.log(`register: ${res.data}`)
                props.setSessionToken(res.data.sessionToken)
                navigate("/home")
            } catch (err) {
                alert(err)
                console.log(err)
            }
        }
        register()
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="title">Register</div>
        <label>
            <span>Username</span>
            <input className="input" ref={username}></input>
        </label><br>
        </br>
        <label>
            <span>Password </span>
            <input className="input" type="password" ref={password}></input>
        </label>
        <br></br>
        <button type="submit">Register</button> 
    </form>    
    
    )
}
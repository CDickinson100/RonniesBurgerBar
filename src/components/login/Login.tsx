import React from 'react';

import './Login.css';
import {Link} from "react-router-dom";

export function Login() {

    async function login() {
        // @ts-ignore
        const email = document.getElementById('email')?.value ?? "";
        // @ts-ignore
        const password = document.getElementById('password')?.value ?? "";
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        };
        const response = await fetch('/login', requestOptions);
        const body = await response.json();
        if (body.message) {
            const incorrect = document.getElementById("incorrect");
            if (incorrect) {
                incorrect.innerText = body.message;
            }
        } else {
            localStorage.setItem("token", body.token);
            // @ts-ignore
            window.location = "/";
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <div className="form">
                <div className="form-input">
                    <input type="text" placeholder="Enter your email" id="email" name="email" required={true}/>
                </div>
                <div className="form-input">
                    <input type="password" placeholder="Enter your password" id="password" name="password"
                           required={true}/>
                </div>
                <p className="form-error" id="incorrect"/>

                <button type="submit" onClick={login}><p>Login</p></button>

                <div className="signup-link">
                    <p>Not a member? <Link to="/register">Signup</Link></p>
                </div>
            </div>

        </div>
    );
}
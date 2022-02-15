import React from 'react';

import './Register.css';
import {Link} from "react-router-dom";

export function Register() {

    async function register() {
        // @ts-ignore
        const email = document.getElementById('email')?.value ?? "";
        // @ts-ignore
        const firstName = document.getElementById('first-name')?.value ?? "";
        // @ts-ignore
        const lastName = document.getElementById('last-name')?.value ?? "";
        // @ts-ignore
        const password = document.getElementById('password')?.value ?? "";
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'email': email,
                'firstName': firstName,
                'lastName': lastName,
                'password': password
            })
        };
        const response = await fetch('/registerUser', requestOptions);
        const body = await response.json();
        if (body.message) {
            const incorrect = document.getElementById("incorrect");
            if (incorrect) {
                incorrect.innerText = body.message;
            }
        } else {
            // @ts-ignore
            window.location = "/login";
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <div className="form">
                <div className="form-input">
                    <input type="text" placeholder="Enter your email" id="email" name="email" required={true}/>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Enter your first name" id="first-name" name="first-name" required={true}/>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="Enter your last name" id="last-name" name="last-name" required={true}/>
                </div>
                <div className="form-input">
                    <input type="password" placeholder="Enter your password" id="password" name="password"
                           required={true}/>
                </div>
                <p className="form-error" id="incorrect"/>

                <button type="submit" onClick={register}><p>Register</p></button>

                <div className="login-link">
                    <p>Already a member? <Link to="/login">Login</Link></p>
                </div>
            </div>

        </div>
    );
}
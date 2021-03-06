import React from 'react';

// @ts-ignore
import banner from "../../graphics/banner.png";
// @ts-ignore
import delivery from "../../graphics/delivery.png";
// @ts-ignore
import discount from "../../graphics/discount.png";
// @ts-ignore
import logo from "../../graphics/logo.png";
import './Home.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

export function Home() {
    return (
        <div className="home">
            <div className="home-landing">
                <img className="background" alt="banner" src={banner}/>
                <img className="delivery" alt="banner" src={delivery}/>
                <img className="discount" alt="banner" src={discount}/>
                <div className="landing-content">
                    <img alt="banner" src={logo}/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor, augue non. </p>
                    <Link to="/menu"><button><h2>ORDER NOW</h2></button></Link>
                </div>
            </div>
            <div className="home-section">
                <h1>ABOUT US</h1>
                <div className="home-content">
                    <iframe title="Map" className="about-location" src="https://maps.google.com/maps?q=Cheltenham&output=embed"/>
                    <p className="about-info">Ronnie's burger bar is a new burger joint located in the heart of
                        Cheltenham. Established in 2017 we have been satisfying customers with our delicious burgers
                        since</p>
                </div>
            </div>
            <div className="home-section">
                <h1>CONTACT US</h1>
                <div className="home-contact">
                    <div className="form-input">
                        <input type="text" placeholder="Enter your name" id="email" name="email" required={true}/>
                    </div>
                    <div className="form-input">
                        <input type="text" placeholder="Enter your email" id="email" name="email" required={true}/>
                    </div>
                    <div className="form-input">
                        <textarea placeholder="Enter your message..."/>
                    </div>
                    <button className="contact-submit"><FontAwesomeIcon icon={faEnvelope}/> Send</button>
                </div>
            </div>
        </div>
    );
}
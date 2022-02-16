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
                    <button><Link to="/menu"><h2>ORDER NOW</h2></Link></button>
                </div>
            </div>
        </div>
    );
}